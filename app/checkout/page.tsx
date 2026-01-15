"use client"
import StripeElement from "@/components/StripeElement"
import { Elements } from "@stripe/react-stripe-js"

function Page() {
  return (<Elements stripe={null}>
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
    >
      <StripeElement />
    </section>
  </Elements>

  )
}

export default Page