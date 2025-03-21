import './style.scss'
import celtel from "@/public/elements/celtel.png";
import zicta from "@/public/elements/zicta.jpg";
import mtn from "@/public/elements/mtn.jpg";
import moe from "@/public/elements/moe.png";
import lafarge from "@/public/elements/lafarge-holcim.png";
import stc from "@/public/elements/save-the-children.jpg";

const Services = () => {
  return (
    
    <div class="inline content-full z-0">
      <section class="Hero inline gap-2">
        <div class="Wrapper block content-3">
          <div class="Visual block-center-center">
            <picture class="FirstPic">
              <source
                srcset={celtel.src}
                media="(width >= 1024px)"
                type="image/avif"
              />
              <source
                srcset="
                  https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-mobile-3.avif
                "
                type="image/avif"
              />

              <source
                srcset="
                  https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-desktop-3.webp
                "
                media="(width >= 1024px)"
                type="image/webp"
              />
              <img
                src="https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-mobile-3.webp"
                alt="Stories Unveiled"
              />
            </picture>
            <picture class="SecondPic">
              <source
                srcset={zicta.src}
                media="(width >= 1024px)"
                type="image/avif"
              />
              <source
                srcset="
                  https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-mobile-2.avif
                "
                type="image/avif"
              />

              <source
                srcset="
                  https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-desktop-2.webp
                "
                media="(width >= 1024px)"
                type="image/webp"
              />
              <img
                src="https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-mobile-2.webp"
                alt="Celebrating Life Together"
              />
            </picture>
            <picture class="ThirdPic">
              <source
                srcset={mtn.src}
                media="(width >= 1024px)"
                type="image/avif"
              />
              <source
                srcset="
                  https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-mobile-1.avif
                "
                type="image/avif"
              />

              <source
                srcset="
                  https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-desktop-1.webp
                "
                media="(width >= 1024px)"
                type="image/webp"
              />
              <img
                src="https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/stories-with-scroll-driven/images/img-mobile-1.webp"
                alt="The Art of Giving"
              />
            </picture>
          </div>
        </div>

        <div class="Content block">
          <div id="StoriesUnveiled" class="FirstLockup block-center-start">
            <div class="block gap-3">
              <h3>Stories Unveiled</h3>
              <div class="subhead">
                Capture the essence of family celebration.
              </div>
              <p>Share the moments that weave your family tale.</p>
            </div>
          </div>
          <div
            id="CelebratingLifeTogether"
            class="SecondLockup block-center-start"
          >
            <div class="block gap-3">
              <h3>Celebrating Life Together</h3>
              <div class="subhead">Embrace the significance of shared joy.</div>
              <p>In every celebration, find the heartwarming stories.</p>
            </div>
          </div>
          <div id="TheArtofGiving" class="ThirdLockup block-center-start">
            <div class="block gap-3">
              <h3>The Art of Giving</h3>
              <div class="subhead">
                Explore the stories within each present.
              </div>
              <p>Every gift is a chapter in your family's narrative.</p>
            </div>
          </div>
        </div>

        {/* <!-- mobile sda  --> */}
        <div class="SmallScreenContent block-center-center">
          <p class="FirstStory">The Art of Giving</p>
          <p class="SecondStory">Celebrating Life Together</p>
          <p class="ThirdStory">Stories Unveiled</p>
        </div>
      </section>

      <div class="pagination block-center-center content-full">
        <div class="inline gap-3">
          <a href="#StoriesUnveiled"></a>
          <a href="#CelebratingLifeTogether"></a>
          <a href="#TheArtofGiving"></a>
        </div>
      </div>
    </div>
  )
}

export default Services