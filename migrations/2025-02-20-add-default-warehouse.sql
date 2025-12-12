-- Seed default warehouse: Shreeji House
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM warehouses WHERE LOWER(name) = LOWER('Shreeji House')
  ) THEN
    INSERT INTO warehouses
      (name, address, city, country, "postalCode", phone, email, "isActive", "createdAt", "updatedAt")
    VALUES
      ('Shreeji House',
       'Shreeji House, Plot No. 1209, Addis Ababa Drive.',
       'Lusaka',
       'Zambia',
       '10101',
       '+260 97 774 0588',
       'sales@shreeji.co.zm',
       true,
       NOW(),
       NOW());
  END IF;
END
$$;

