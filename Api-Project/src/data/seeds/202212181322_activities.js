const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.activity).insert([
        {
            id: 1,
            title: "’t Winkeltje",
            starttime: "2023-01-08T15:00:00",
            endtime: "2023-01-08T16:30:00",
            description: "Verkoop van zelfgemaakte en biologische producten in ons winkeltje, gerund door vrijwilligers van de ouderenboerderij. De winst wordt geïnvesteerd in onze werking.|winkel|Welkom in ’t winkeltje. Hier worden zelfgemaakte en bio producten verkocht van in onze ouderenboerderij. De mensen die instaan voor ’t winkeltje zijn vrijwilligers van op de ouderenboerderij. Daarnaast gaat wordt alle winst geïnvesteerd in onze werking. ",
            maxregistrations: 15,
            organizerid: 2,
        },
        {
            id: 2,
            title: "Moestuin",
            starttime: "2023-01-15T15:00:00",
            endtime: "2023-01-15T16:30:00",
            description: "Zelf groenten en fruit kweken in onze moestuin. De opbrengst wordt gebruikt voor kooklessen en verkoop in het winkeltje. Vrijwilligers helpen bij het onderhoud.|tuin|In onze eigen moestuin kweken wij verschillende soorten groenten en fruit dat kan gebruikt worden om te koken of om te verkopen in ’t winkeltje. Het onderhoud van onze moestuin gebeurt door onze vrijwilligers.",
            maxregistrations: 15,
            organizerid: 2,
        },
        {
          id: 3,
          title: "Dierenverzorging",
          starttime:"2023-01-22T15:00:00",
          endtime: "2023-01-22T16:30:00",
          description: "Als vrijwilliger kun je meehelpen met de verzorging van onze dieren. Taken omvatten borstelen, wandelen en voeren. Ervaar de vreugde van dierenvriendschap!|dierenverzorging|Als vrijwilliger in onze ouderenboerderij kan je er ook voor kiezen om in te staan voor de verzorging van onze dieren. Hiertoe behoort een uiteenlopend takenpakket. Enkele voorbeelden zijn: borstelen, wandelen, eten geven…",
          maxregistrations: 15,
          organizerid: 2,
      },
      {
          id: 4,
          title: "Kooklessen",
          starttime: "2023-01-29T15:00:00",
          endtime: "2023-01-29T16:30:00",
          description: "Samen koken in de ouderenboerderij. Dagelijks verse soep en de mogelijkheid om eigen recepten te delen. Verkoop van bereide gerechten in het winkeltje.|koken|In de ouderenboerderij is er de mogelijkheid om samen te koken. Dagelijks wordt er verse soep bereid om te benuttigen in onze cafetaria en te verkopen in ’t winkeltje. Eigen voorstellen zijn steeds welkom en kunnen samen benuttigd worden of verkocht in de cafetaria of ’t winkeltje.",
          maxregistrations: 15,
          organizerid: 2,
      }
    ]);
  },
};