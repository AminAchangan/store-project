import Image from "next/image";

function FeatureCards() {
  const cards = [
    {
      id: 1,
      icon: "/cartIcon/shipping.svg",
      feature: "Free Shipping",
      desc: "Order above $200s",
    },
    {
      id: 2,
      icon: "/cartIcon/money.svg",
      feature: "Money-back",
      desc: "30 days guarantee",
    },
    {
      id: 3,
      icon: "/cartIcon/lock.svg",
      feature: "Secure Payments",
      desc: "Secure by Stripe",
    },
    {
      id: 4,
      icon: "/cartIcon/call.svg",
      feature: "24/7 Support",
      desc: "Phone and Email Support",
    },
  ];

  return (
    <>
      <section className="md:w-[80%] w-[90%] mx-auto mt-10">
        <div className="grid grid-cols-2 gap-4 xl:flex xl:flex-row xl:justify-center xl:gap-x-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="rounded-3xl bg-primary-200 p-6 flex flex-col justify-center items-start
                         md:py-10 md:px-8 md:h-[220px] md:min-w-[260px]"
            >
              <Image
                src={card.icon}
                alt={card.feature}
                width={50}
                height={50}
                className="w-8 h-8 md:w-[50px] md:h-[50px]"
              />
              <h1 className="text-base md:text-xl mt-4">{card.feature}</h1>
              <h3 className="text-xs text-primary-400 mt-2">{card.desc}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default FeatureCards;
