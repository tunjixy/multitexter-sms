<template>
  <div>
    <section class="pt-24">
      <div class="container">
        <h1
          class="text-3xl font-bold text-center md:text-4xl lg:text-5xl text-pretty"
        >
          MultiTexter.com - Who We Are
        </h1>
      </div>
    </section>

    <section class="py-16">
      <div class="container">
        <p
          class="text-lg leading-loose text-light-text dark:text-dark-light-text"
        >
          Multitexter is an online Bulk SMS platform for sending text messages
          from any internet connected device. Multitexter is a company which
          caters for the provision of information technology services including
          Website design, Web application development, customised software
          development, and more. We currently deliver SMS to four major GSM
          networks in Nigeria including, Glo, MTN, Airtel, and 9Mobile, and most
          of the major GSM networks internationally. Our business is information
          technology and that means that we use technology to aggregate,
          manipulate and disseminate information in a way that makes it useful
          to the end users. Efficiency is our watchword, hence the need to
          provide adequate room for research and development. Hence we ensure
          that our customers get the best user experience from using our
          services, and provide support accordingly.
        </p>
        <ul class="mt-10 ml-10 space-y-5 list-disc">
          <li
            v-for="(feature, index) in features"
            :key="index"
            class="text-light-text dark:text-dark-light-text"
          >
            {{ feature }}
          </li>
        </ul>
        <p class="mt-6 text-light-text dark:text-dark-light-text">
          Constant improvement is very important to us and that’s why we are
          here for you.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Multitexter BulkSMS - About Us',
})

const features = ref([
  'Auto phone number extraction from text',
  'Delivery reports for each SMS sent',
  'Instant speedy dispatch of thousands of SMS at a single click',
  'Scheduled SMS for times when you may be away from the Internet',
  'Easy phone book/contacts management',
  'Import/insert contacts and phone numbers from text files in any format',
  'Manage contacts using contact lists of number groups',
  'Dynamic/customised sender name of up to 11 characters, or 14 numbers',
  'Long/multi-page SMS with up to six (6) pages in one message',
])
</script>
