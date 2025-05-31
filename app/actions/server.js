export async function getRegistrations(userId){
    const tourMockData = [
        {
            id: 1,
            title: "FIFA",
            date: "2025-05-01",
            location: "London",
            status: "Registered",
          },
          {
            id: 2,
            title: "Call of Duty",
            date: "2025-05-10",
            location: "Manchester",
            status: "Registered",
          },
    ]

    return tourMockData.filter((tour)=> tour && userId);
}