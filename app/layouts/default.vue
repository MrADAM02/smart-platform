<template>
  <div class="flex min-h-screen flex-col">
    <a href="#main" class="sr-only z-50 rounded-lg bg-brand-700 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4">{{ $t('nav.skip') }}</a>
    <LayoutTopBar />
    <LayoutSiteHeader />
    <main id="main" class="flex-1">
      <slot />
    </main>
    <LayoutSiteFooter />
    <LayoutWhatsAppFloat />
  </div>
</template>
