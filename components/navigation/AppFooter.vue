<template>
  <footer class="w-full pt-12 pb-10 bg-grey/10 dark:bg-grey/5 shadow-custom">
    <div class="container">
      <div
        class="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <div>
          <h6 class="text-lg font-bold">Resources</h6>
          <ul class="mt-3 space-y-4">
            <li
              v-for="(resource, index) in resources"
              :key="index"
              class="text-light-text dark:text-dark-light-text"
            >
              <nuxt-link :to="resource.link" class="text-sm hover:text-primary">
                {{ resource.name }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div>
          <h6 class="text-lg font-bold">Blog</h6>
          <ul class="mt-3 space-y-4">
            <li
              v-for="(post, index) in posts"
              :key="index"
              class="text-light-text dark:text-dark-light-text"
            >
              <nuxt-link :to="post.url" class="text-sm hover:text-primary">
                {{ post.title }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div>
          <h6 class="text-lg font-bold">How Does MultiTexter Works?</h6>
          <p
            class="mt-3 text-sm leading-relaxed text-light-text dark:text-dark-light-text"
          >
            First of all, you need to
            <nuxt-link to="/signup" class="font-bold text-primary">
              register here
            </nuxt-link>
            and we will create your account.
          </p>
        </div>
        <div>
          <h6 class="text-lg font-bold">Need Help?</h6>
          <ul
            class="mt-3 space-y-4 text-sm text-light-text dark:text-dark-light-text"
          >
            <li>6th Floor, 294 Herbert Macaulay Way, Sabo Yaba, Lagos</li>
            <li>
              <a class="hover:text-primary" href="tel:+2348038259157">
                08038259157
              </a>
            </li>
            <li>
              <a class="hover:text-primary" href="mailto:info@multitexter.com">
                info@multitexter.com
              </a>
            </li>
            <li>
              <ul class="flex items-center gap-3">
                <li v-for="(icon, index) in socials" :key="index">
                  <nuxt-link
                    :to="icon.url"
                    :title="icon.name"
                    target="_blank"
                    external
                  >
                    <component
                      :is="icon.icon"
                      class="w-5 h-5 hover:text-primary"
                    />
                  </nuxt-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <p
        class="mt-8 text-sm text-center text-light-text dark:text-dark-light-text"
      >
        &copy; {{ currentYear }} Multitexter BulkSMS. All Rights Reserved
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import FacebookIcon from '@/assets/icons/social/facebook.svg?component'
import XIcon from '@/assets/icons/social/x.svg?component'

const resources = [
  {
    name: 'Coverage',
    link: '/coverage',
  },
  {
    name: 'Privacy Policy',
    link: '/privacy-policy',
  },
  {
    name: 'Contact Sales',
    link: '/contact-sales',
  },
  {
    name: 'Integration Request',
    link: '/request',
  },
  {
    name: 'Contact Us',
    link: '/contact',
  },
  {
    name: 'About Us',
    link: '/about',
  },
  {
    name: 'Terms & Condition',
    link: '/terms',
  },
]
const posts = ref([
  {
    title: 'How to buy contacts numbers to send Bulk SMS on Multitexter.com',
    url: '/blog/how-to-buy-contacts-numbers-to-send-bulk-sms-on-multitextercom',
  },
  {
    title:
      'Multitexter.com Best Bulk SMS in Nigeria, Override DND active numbers',
    url: '/blog/multitextercom-best-bulk-sms-in-nigeria-override-dnd-active-mtn-numbers-1',
  },
])
const socials = ref([
  {
    name: 'Facebook',
    icon: markRaw(FacebookIcon),
    url: 'https://www.facebook.com/multitexterdotcom',
  },
  {
    name: 'X',
    icon: markRaw(XIcon),
    url: 'https://twitter.com/intent/follow?original_referer=http%3A%2F%2Fwww.multitexter.com%2Fpages%2Fdevelopers&region=follow_link&screen_name=multitexter&tw_p=followbutton',
  },
])

const currentYear = computed(() => {
  return new Date().getFullYear()
})
</script>
