import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CatalogService } from '../catalog/catalog.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Cart, CartItem } from './interfaces/cart.interface';

@Injectable()
export class CartService {
  private readonly carts = new Map<string, Cart>();

  constructor(private readonly catalogService: CatalogService) {}

  async createCart(currency = 'USD'): Promise<Cart> {
    const id = uuid();
    const cart: Cart = {
      id,
      currency,
      items: [],
      subtotal: 0,
      taxTotal: 0,
      total: 0,
      updatedAt: new Date().toISOString(),
    };
    this.carts.set(id, cart);
    return cart;
  }

  getCart(cartId: string): Cart {
    const cart = this.carts.get(cartId);
    if (!cart) {
      throw new NotFoundException(`Cart ${cartId} not found`);
    }
    return cart;
  }

  async addItem(cartId: string, payload: AddCartItemDto): Promise<Cart> {
    const cart = this.getCart(cartId);
    const product = await this.catalogService.getProductById(payload.productId);

    if (product.stockQuantity < payload.quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    const existingItem = cart.items.find((item) => item.productId === product.id);
    if (existingItem) {
      existingItem.quantity += payload.quantity;
      existingItem.subtotal = existingItem.quantity * existingItem.unitPrice;
    } else {
      const cartItem: CartItem = {
        id: uuid(),
        productId: product.id,
        quantity: payload.quantity,
        unitPrice: product.discountedPrice ?? product.price,
        taxRate: product.taxRate ?? undefined,
        subtotal: (product.discountedPrice ?? product.price) * payload.quantity,
        productSnapshot: {
          id: product.id,
          name: product.name,
          sku: product.sku,
          slug: product.slug,
          price: product.price,
          discountedPrice: product.discountedPrice,
          taxRate: product.taxRate,
          isDigital: product.isDigital,
        },
      };
      cart.items.push(cartItem);
    }

    this.recalculate(cart);
    return cart;
  }

  updateItem(cartId: string, itemId: string, payload: UpdateCartItemDto): Cart {
    const cart = this.getCart(cartId);
    const item = cart.items.find((cartItem) => cartItem.id === itemId);
    if (!item) {
      throw new NotFoundException(`Item ${itemId} not found in cart`);
    }

    item.quantity = payload.quantity;
    item.subtotal = item.quantity * item.unitPrice;
    this.recalculate(cart);
    return cart;
  }

  removeItem(cartId: string, itemId: string): Cart {
    const cart = this.getCart(cartId);
    cart.items = cart.items.filter((item) => item.id !== itemId);
    this.recalculate(cart);
    return cart;
  }

  clearCart(cartId: string): Cart {
    const cart = this.getCart(cartId);
    cart.items = [];
    this.recalculate(cart);
    return cart;
  }

  private recalculate(cart: Cart) {
    cart.subtotal = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
    cart.taxTotal = cart.items.reduce((sum, item) => {
      const itemTax = item.taxRate ? (item.subtotal * item.taxRate) / 100 : 0;
      return sum + itemTax;
    }, 0);
    cart.total = cart.subtotal + cart.taxTotal;
    cart.updatedAt = new Date().toISOString();
  }
}

