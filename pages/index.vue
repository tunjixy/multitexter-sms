<template>
  <div>
    <section class="min-h-[40vh] py-16">
      <div class="container">
        <h1
          class="text-2xl font-bold text-center md:text-4xl lg:text-5xl text-pretty"
        >
          Welcome to MultiTexter Bulk SMS
        </h1>
        <p
          class="mt-3 text-lg text-center lg:text-xl text-light-text dark:text-dark-light-text text-pretty"
        >
          Send Bulk SMS, Save Time, Save Money
        </p>
        <HomeFlow />
      </div>
    </section>

    <section class="py-16 bg-grey/20 dark:bg-grey/5">
      <div class="container">
        <div class="grid gap-10 md:grid-cols-2">
          <div class="flex flex-col items-center justify-center">
            <h2 class="mb-4 text-2xl font-bold text-center text-pretty">
              Get the MultiTexter Mobile App
            </h2>
            <a
              href="https://play.google.com/store/apps/details?id=com.lordni.multitextersms"
              target="_blank"
            >
              <img
                src="/assets/app.png"
                alt="Multitexter Bulk SMS Android App"
              />
            </a>
          </div>
          <div class="flex justify-center">
            <img src="/assets/mobile.png" alt="Multitexter App" />
          </div>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container">
        <h2 class="text-2xl font-bold text-center md:text-4xl text-pretty">
          Why Choose US
        </h2>
        <ul
          class="grid grid-cols-1 gap-5 mt-10 sm:gap-10 sm:grid-cols-2 xl:grid-cols-3"
        >
          <li
            v-for="(feature, index) in features"
            :key="index"
            class="px-8 py-6 bg-white border rounded-lg border-grey dark:border-grey/10 dark:bg-dark-secondary shadow-custom"
          >
            <div
              class="flex items-center justify-center rounded-full size-14 bg-primary/10 shadow-custom"
            >
              <component :is="feature.icon" class="w-6 h-6 text-primary" />
            </div>
            <h3 class="mt-5 font-bold">{{ feature.title }}</h3>
            <p class="max-w-xs mt-1 text-light-text dark:text-dark-light-text">
              {{ feature.description }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <section class="py-16 bg-grey/20 dark:bg-grey/5">
      <div class="container">
        <div class="grid gap-10 md:grid-cols-2">
          <div class="flex flex-col justify-center">
            <h2 class="max-w-xl text-2xl font-bold md:text-4xl">
              Send Bulk SMS to any Network in Nigeria at one unit per SMS
            </h2>
            <p
              class="max-w-xl mt-3 leading-loose text-light-text dark:text-dark-light-text"
            >
              MultiTexter provides the smartest, fastest and most reliable means
              of sending text messages in Nigeria and across Africa; reaching
              thousands of people with just one click with instant delivery
              report.
            </p>
            <div class="mt-8">
              <nuxt-link
                class="px-8 py-3 text-sm font-bold text-white rounded bg-primary hover:bg-primary-dark shadow-btn"
                to=""
              >
                View Our Coverage
              </nuxt-link>
            </div>
          </div>
          <div>
            <EarthIcon class="h-[400px] w-full" />
          </div>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container">
        <div class="grid gap-10 md:grid-cols-2">
          <div class="order-last md:order-first">
            <PaymentIcon class="h-[300px] w-full" />
          </div>
          <div class="flex flex-col justify-center order-first md:order-last">
            <h2 class="max-w-xl text-2xl font-bold md:text-4xl">
              Multiple and Flexible Payment Options
            </h2>
            <p
              class="max-w-xl mt-3 leading-loose text-light-text dark:text-dark-light-text"
            >
              With either Bank Deposits or Online Transfer, Payment is easily
              integrated to give you your SMS Units.We accept MasterCard,
              Verified by Visa, eTranzact, Verve and Interswitch Cards for
              online payments and for Bank Deposits, First Bank, Diamond Bank,
              GTBank and Zenith Bank.
            </p>
            <div class="mt-8">
              <nuxt-link
                class="inline-block px-8 py-3 text-sm font-bold text-white rounded bg-primary hover:bg-primary-dark shadow-btn"
                to=""
              >
                View Pricing
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-grey/20 dark:bg-grey/5">
      <div class="container">
        <h2
          class="max-w-2xl mx-auto text-2xl font-bold text-center md:text-4xl text-pretty"
        >
          For One-Time-Password and Financial Institution/Bank Traffic.
        </h2>
        <p
          class="max-w-3xl mx-auto mt-5 leading-loose text-center text-light-text dark:text-dark-light-text"
        >
          We have a special pricing and onboarding process to ensure your sender
          name gets delivered to all networks regardless of whether or not they
          are DND active. Do call us on
          <a class="font-bold text-primary" href="tel:+2348185784118">
            08185784118
          </a>
          or contact us
          <nuxt-link class="font-bold text-primary" to=""> HERE. </nuxt-link>
        </p>
      </div>
    </section>

    <section class="py-16">
      <div class="container">
        <h2 class="text-2xl font-bold text-center md:text-4xl text-pretty">
          Our Clients
        </h2>
        <p
          class="mt-2 text-lg text-center text-light-text dark:text-dark-light-text"
        >
          Here are some of our clients that have worked with us
        </p>
        <ul
          class="flex flex-wrap items-center justify-between gap-8 mx-auto mt-10"
        >
          <li v-for="(client, index) in clients" :key="index">
            <img
              class="h-16 rounded-full"
              :src="`/assets/${client.image}`"
              :alt="client.alt"
            />
          </li>
        </ul>
      </div>
    </section>

    <section class="py-16 bg-grey/20 dark:bg-grey/5">
      <div class="container">
        <div class="grid gap-10 md:grid-cols-2">
          <div>
            <ReferIcon class="h-[400px] w-full" />
          </div>
          <div class="flex flex-col justify-center">
            <h2 class="text-2xl font-bold md:text-4xl text-pretty">
              Refer Multitexter & Make Money
            </h2>
            <p
              class="mt-2 leading-loose text-light-text dark:text-dark-light-text"
            >
              After signing up for bulk sms, a unique referral link is generated
              for you. Go to Profile Summary after logging in, to retrieve your
              REFERRAL. It looks like this
              https://multitexter.com/signup?ref=refid Send your referral link
              to someone register, and when the person recharges, you get extra
              units. You can sell your extra units by Transferring the units and
              get cash from them
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import PcIcon from '@/assets/icons/pc.svg?component'
import BulkIcon from '@/assets/icons/bulk-sms.svg?component'
import FastIcon from '@/assets/icons/fast.svg?component'
import CalendarIcon from '@/assets/icons/calendar.svg?component'
import UploadIcon from '@/assets/icons/upload.svg?component'
import UsersIcon from '@/assets/icons/users.svg?component'
import ReferIcon from '@/assets/icons/refer.svg?component'
import PaymentIcon from '@/assets/icons/payment.svg?component'
import EarthIcon from '@/assets/icons/earth.svg?component'

const features = ref([
  {
    icon: markRaw(PcIcon),
    title: 'Easy to Use Web Interface',
    description:
      'Manage marketing campaigns and internal communications online.',
  },
  {
    icon: markRaw(BulkIcon),
    title: 'Save Time & Send in Bulk',
    description: 'Stop sending texts one by one and send in bulk instead.',
  },
  {
    icon: markRaw(FastIcon),
    title: 'Fast, Secure & Reliable',
    description:
      'All texts are delivered quickly via Tier 1 routes around the world.',
  },
  {
    icon: markRaw(CalendarIcon),
    title: 'Schedule and Send Later',
    description:
      'Schedule messages for later delivery. Set up multiple schedules at a time and let out system do the rest.',
  },
  {
    icon: markRaw(UploadIcon),
    title: 'Upload Contacts in .CSV',
    description:
      'Do you need to upload contacts? You can now upload numbers that are in .CSV format.',
  },
  {
    icon: markRaw(UsersIcon),
    title: 'Unlimited SMS Recipient',
    description:
      'Send messages to unlimited number of recipients. You are only limited by your available credit units.',
  },
])
const clients = ref([
  {
    image: 'covenant.jpg',
    alt: 'Covenant',
  },
  {
    image: 'prep.png',
    alt: 'Prep Class',
  },
  {
    image: 'buypowerng.jpg',
    alt: 'Buy power',
  },
  {
    image: 'rccg.png',
    alt: 'Redeemed',
  },
  {
    image: 'iroko.png',
    alt: 'Iroko Tv',
  },
  {
    image: 'dominous.png',
    alt: 'Dominous Pizza',
  },
  {
    image: 'blackbelt.jpg',
    alt: 'Blackbelt',
  },
])
</script>
