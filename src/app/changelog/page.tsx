export default function ChangelogPage() {
  return (
     <div className="flex mt-8 mx-4 md:mx-30 sm:mx-10 items-center ">
      <main className="  w-full  ">
        <h1 className="text-3xl font-semibold leading-10 m-1">
          Changelog
        </h1>
        <hr/>
        <h2 className="font-bold mt-2 text-2xl">2.3 - tactic and misc</h2>
        <ul className="list-disc list-inside text-sm md:text-base">
          <li>Merchants give bonus to Earn action</li>
          <li>Trade Routes now give a big payout when you Earn</li>
          <li>Entertainers give flat coins per expansion</li>
          <li>Wraiths now place a unit when they clear a region</li>
          <li>Flying Castles now give free outposts</li>
          <li>Magicator lost counterspell but allows to buy charges for other cards</li>
          <li>New tier 4 card: Blockade Patrol ﹙siege/tactic﹚</li>
        </ul>
          <h2 className="font-bold mt-2 text-2xl">2.2 - magic overhaul</h2>
        <ul className="list-disc list-inside text-sm md:text-base">
          <li>Alchemists damage now scales with magic</li>
          <li>Portal Hoppers replace Illusionists and teleport units into Battle</li>
          <li>New tier 5 Card: Field Magicator ﹙magic/retinue﹚</li>
        </ul>
           <h2 className="font-bold mt-2 text-2xl">2.1 - tier 5 tweaks</h2>
        <ul className="list-disc list-inside text-sm md:text-base">
          <li>Dragon Riders no longer improve movement, instead they hit a second region.</li>
          <li>Flying Castles now kill units on impact. </li>
          <li>Werewolves give food per Aftermath, not per unit.</li>
        </ul>
        <h2 className="font-bold mt-2 text-2xl">2.0</h2>
        <ul className="list-disc list-inside text-sm md:text-base">
          <h3 className="font-bold mt-2">Balance</h3>
          <li>Entertainers convert cost 5 → 10 <span className="italic md:text-sm">﹙This was way too impactful for the low cost﹚</span> </li>
          <li>Knights now accept charges, charge cost 7 → 5 food</li>
          <li>Pillagers steal overflow in resources, but only kill 1 unit if the victim does not have enough coins</li>
          <h3 className="font-bold mt-2">App</h3>
          <li>User can now select tags to use for Shapeshifters. If a new card with same tags is added, Shapeshifter tags will be removed and must be selected again.</li>
        </ul>
      </main>
    </div>
  );
}