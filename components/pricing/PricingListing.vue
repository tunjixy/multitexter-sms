<template>
  <div>
    <template v-if="prices">
      <EmptyState v-if="prices.length === 0"> No prices available </EmptyState>
      <UiTable v-else class="mt-5">
        <TableCaption>A list of our prices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="uppercase"> Number of Unit </TableHead>
            <TableHead class="uppercase">Unit Price</TableHead>
            <TableHead class="text-right uppercase">
              Min Payment - Max Payment
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="price in prices" :key="price.id">
            <TableCell>
              {{ formatNumberWithComma(price.minimum_units) }} to
              {{ formatNumberWithComma(price.maximum_units) }} Units
            </TableCell>
            <TableCell>₦{{ price.price }}</TableCell>
            <TableCell class="text-right">
              ₦{{ formatNumberWithComma(price.minimum_units * price.price) }} -
              ₦{{
                formatNumberWithComma(
                  Math.round(price.maximum_units * price.price),
                )
              }}
            </TableCell>
          </TableRow>
        </TableBody>
      </UiTable>
    </template>
    <p class="mt-5 text-sm font-bold">Notes:</p>
    <ul class="mt-3 ml-3 space-y-3 list-disc">
      <li
        v-for="(note, index) in priceNotes"
        :key="index"
        class="text-sm text-light-text dark:text-dark-light-text"
      >
        {{ note }}
      </li>
    </ul>
    <h2 class="mt-10 text-lg font-bold">2. Subscription Plans</h2>
    <p class="mt-2 text-light-text dark:text-dark-light-text">
      Our subscription plans provide you 6 options to choose from. With any of
      these plans, you can now purchase SMS units at a more discounted price to
      all networks. Each subscription plan comes with preloaded units and is
      billed monthly.
    </p>
    <template v-if="priceBundles">
      <EmptyState v-if="priceBundles.length === 0">
        No bundle plans available
      </EmptyState>
      <UiTable v-else class="mt-5">
        <TableCaption>A list of our bundle prices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="uppercase"> Name </TableHead>
            <TableHead class="uppercase">Preloaded Unit</TableHead>
            <TableHead class="text-right uppercase"> Amount </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="bundle in priceBundles" :key="bundle.id">
            <TableCell>{{ bundle.bundle_name }}</TableCell>
            <TableCell>
              {{ formatNumberWithComma(bundle.total_units) }}
            </TableCell>
            <TableCell class="text-right">
              ₦{{ formatNumberWithComma(bundle.amount) }}
            </TableCell>
          </TableRow>
        </TableBody>
      </UiTable>
    </template>
    <p class="mt-5 text-sm font-bold">Notes:</p>
    <ul class="mt-3 ml-3 space-y-3 list-disc">
      <li
        v-for="(note, index) in priceBundleNotes"
        :key="index"
        class="text-sm text-light-text dark:text-dark-light-text"
      >
        {{ note }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { prices, priceBundles, priceNotes, priceBundleNotes } = usePricing()
</script>
