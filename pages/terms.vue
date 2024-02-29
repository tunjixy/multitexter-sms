<template>
  <div>
    <section class="pt-24">
      <div class="container">
        <h1
          class="text-3xl font-bold text-center md:text-4xl lg:text-5xl text-pretty"
        >
          Terms of Service
        </h1>
      </div>
    </section>

    <section class="pt-16">
      <div class="container">
        <p class="text-lg font-bold">
          PLEASE REVIEW THESE TERMS CAREFULLY. ONCE ACCEPTED, THESE TERMS BECOME
          A BINDING LEGAL COMMITMENT BETWEEN YOU AND MultiTexter BulkSMS. IF YOU
          DO NOT AGREE TO BE BOUND BY THESE TERMS, YOU SHOULD NOT CLICK THE
          “Register Now” BUTTON AND YOU SHOULD NOT USE MultiTexter BulkSMS
          SERVICES.
        </p>
        <p class="mt-3 text-lg font-bold">
          IMPORTANT NOTE: MultiTexter BulkSMS DOES NOT PROVIDE WARRANTIES FOR
          ITS SERVICES, AND THESE TERMS LIMIT OUR LIABILITY TO YOU. IN ADDITION,
          DISPUTES ABOUT THESE TERMS OR RELATING TO YOUR MultiTexter BulkSMS
          ACCOUNT OR MultiTexter BulkSMS’S SERVICES GENERALLY MUST BE RESOLVED
          BY BINDING ARBITRATION AND ON AN INDIVIDUAL BASIS ONLY.
        </p>
        <ul class="mt-10 ml-6 space-y-5 list-disc">
          <li
            v-for="(item, index) in list1"
            :key="index"
            class="text-light-text dark:text-dark-light-text"
          >
            {{ item }}
          </li>
        </ul>
        <p class="mt-6 text-light-text dark:text-dark-light-text">
          Constant improvement is very important to us and that’s why we are
          here for you.
        </p>
      </div>
    </section>

    <section class="pt-16">
      <div class="container">
        <h2 class="text-lg font-bold">General Conditions</h2>
        <ul class="mt-10 ml-6 space-y-5 list-disc">
          <li
            v-for="(item, index) in list2"
            :key="index"
            class="text-light-text dark:text-dark-light-text"
          >
            {{ item }}
          </li>
        </ul>
        <p class="mt-6 leading-loose text-light-text dark:text-dark-light-text">
          You understand and agree that your use MultiTexter BulkSMS and it's
          Services at your own discretion and risk and that you will be solely
          responsible for any damages that arise from such use. Under no
          circumstances shall MultiTexter BulkSMS be liable for any direct,
          indirect, special, incidental, consequential or punitive damages of
          any kind, or any other damages whatsoever (however arising, including
          by negligence), including without limitation, damages related to use,
          misuse, reliance on, inability to use and interruption, suspension, or
          termination of the site or services, damages incurred through any
          links provided on the site and the non-performance thereof and damages
          resulting from loss of use, sales, data, goodwill or profits, whether
          or not MultiTexter BulkSMS has been advised of such possibility.
        </p>
        <p class="mt-2 font-bold leading-loose">
          MultiTexter BulkSMS SERVICES ARE NOT INTENDED TO SUPPORT OR CARRY
          EMERGENCY CALLS OR SMS MESSAGES TO ANY EMERGENCY SERVICES. NEITHER
          MultiTexter BulkSMS NOR ITS REPRESENTATIVES WILL BE LIABLE UNDER ANY
          LEGAL OR EQUITABLE THEORY FOR ANY CLAIM, DAMAGE, OR LOSS (AND CUSTOMER
          WILL HOLD MultiTexter BulkSMS HARMLESS AGAINST ANY AND ALL SUCH
          CLAIMS) ARISING FROM OR RELATING TO THE INABILITY TO USE OUR SERVICES
          TO CONTACT EMERGENCY SERVICES.
        </p>
      </div>
    </section>

    <section class="pt-16">
      <div class="container">
        <h2 class="text-lg font-bold">Assignment</h2>
        <p class="mt-3 leading-loose text-light-text dark:text-dark-light-text">
          You will not assign or otherwise transfer these Terms, in whole or in
          part, without our prior written consent. Any attempt by you to assign,
          delegate, or transfer these Terms will be null and void. Subject to
          this Section 16.3, these Terms will be binding on both you and
          MultiTexter BulkSMS and each of our successors and assigns.
        </p>
      </div>
    </section>

    <section class="py-16">
      <div class="container">
        <h2 class="text-lg font-bold">Indemnification</h2>
        <p class="mt-3 leading-loose text-light-text dark:text-dark-light-text">
          You will defend, indemnify and hold MultiTexter BulkSMS and its
          affiliates harmless against any actual or threatened claim, loss,
          liability, proceeding, third-party discovery demand, governmental
          investigation or enforcement action arising out of or relating to your
          activities under these Terms or your acts or omissions in connection
          with the provision of Your Application, including, without limitation,
          any intellectual property claims relating to the Your Application and
          any violation by you or your End Users of the terms of the General
          Conditions. We and our affiliates will cooperate as fully as
          reasonably required in the defense of any Claim, at your expense. We
          reserve the right, at your expense, to retain separate counsel for
          ourselves in connection with any Claim or, if you have not responded
          reasonably to the applicable Claim, to assume the exclusive defense
          and control of any Claim in which you are a named party and that is
          otherwise subject to indemnification. You will pay all costs,
          reasonable attorneys’ fees and any settlement amounts or damages
          awarded against us in connection with any Claim. You will also be
          liable to us for any costs and attorneys’ fees we incur to
          successfully establish or enforce our right to indemnification under
          this Section.
        </p>
        <p class="mt-2 leading-loose text-light-text dark:text-dark-light-text">
          Your only right with respect to any dissatisfaction with this site or
          services or with MultiTexter BulkSMS shall be to terminate use of this
          site and services.
        </p>
        <p class="mt-2 leading-loose text-light-text dark:text-dark-light-text">
          If you have any issues about the above terms and conditions, please
          send an email to
          <a class="text-primary" href="mailto:info@multitexter.com"
            >info@multitexter.com</a
          >
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Multitexter BulkSMS - Terms',
})

const list1 = ref([
  'You must be 13 years or older to use this site.',
  'You are responsible for keeping your password secure.',
  'You may not use the MultiTexter BulkSMS service for any illegal or unauthorized purpose. International users agree to comply with all local laws regarding online conduct and acceptable content.',
  'You are solely responsible for your conduct and any data, text, information, screen names, or Content that you submit, post, and display on the MultiTexter BulkSMS service.',
  'You must not modify, adapt or hack MultiTexter BulkSMS or modify another website so as to falsely imply that it is associated with MultiTexter BulkSMS',
  'You must not create or submit fraudulent (SCAM), or unwanted (SPAM) SMS using our platform.',
  'You must not transmit any worms or viruses or any code of a destructive nature.',
  'You are solely responsible for your use of the Site and Services. MultiTexter BulkSMS may archive links to third-party websites. The linked websites content, business practices and privacy policies are not under our control, and we are not responsible for the content of any linked website or any link contained in a linked website. The inclusion of a link on the Site or Services does not imply any endorsement by or any affiliation with MultiTexter BulkSMS. In accessing the Site and Services or following links to third-party websites you may be exposed to content that you consider offensive or inappropriate. You agree that your only recourse is to stop using the Site and Services',
  'You must not, in the use of MultiTexter BulkSMS, violate any laws in your jurisdiction (including but not limited to copyright laws). Violation of any of these agreements will result in the termination of your MultiTexter BulkSMS account.',
  'You must complete the registration process providing only true and accurate information as lined out on the registration form to open an account. You are responsible for the privacy and confidentiality of username and password. Also, you are wholly responsible for all activities that occur under your account. We will not be held liable to any third party claims and/or actions taken with respect to services offered. You agree to notify us immediately of any unauthorized access or use of your account.',
])
const list2 = ref([
  'We reserve the right to modify or terminate the MultiTexter BulkSMS service for any reason, without notice at any time.',
  'We reserve the right to alter these Terms of Use at any time.',
  'We reserve the right to modify prices, charges or fees at any time. Any changes shall be posted on MultiTexter BulkSMS pricing page with or without prior notification.',
  'We will NOT provide you a refund for any charges made on your credit card, debit card or any payments. You agree that all payment for services are final and non-refundable. You are responsible for all charges resulting from the use of MultiTexter BulkSMS.',
  'We reserve the right, in accordance with any applicable laws, to refuse service to anyone for any reason at any time.',
  "We may, but have no obligation to, remove Content and accounts containing Content that we determine in our sole discretion are unlawful, offensive, threatening, libellous, defamatory, obscene or otherwise objectionable or violates any party's intellectual property or these Terms of Use.",
  'MultiTexter BulkSMS and you are independent entities, and nothing in the Terms, or via use of the Site or Services, will create any partnership, joint venture, agency, franchise, sales representative, or employment relationship between MultiTexter BulkSMS and you.',
  'MultiTexter BulkSMS reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that MultiTexter BulkSMS shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service.',
])
</script>
