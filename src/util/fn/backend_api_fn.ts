import { TheaterType } from "@/types/components-types/admin/theater/admin-theater-types";
import { modifySeatValueFunctionType, ClientSelectedSeatType } from "@/types/pages-types/client/client-event-type";

export const ValidateNotOccupiedSeats = (oldT: TheaterType, newT: Partial<TheaterType>): boolean => {
    console.log("Validating Init");

    const existingTheaterSeats = { ...oldT };
    const newSeats = { ...newT };

    const combinedExistingSeats = { ...existingTheaterSeats.mainSeats, ...existingTheaterSeats.sideSeats };
    const combinedNewSeats = { ...newSeats.mainSeats, ...newSeats.sideSeats };

    for (const [rowName, rowSeats] of Object.entries(combinedExistingSeats)) {
        for (let index = 0; index < rowSeats.length; index++) {
            const seatValue = rowSeats[index];

            if (seatValue === 1 && combinedNewSeats[rowName]?.[index] === 2) {
                console.log("ValidateNotOccupiedSeats", "new:", combinedNewSeats[rowName]?.[index], "old:", seatValue, "at ", rowName);
                return false;
            }
        }
    }

    return true;
};

export const selectSeats = (TheaterSeats: modifySeatValueFunctionType): modifySeatValueFunctionType => {
    const newTheaterSeatDetails = { ...TheaterSeats };
    const combinedSeats = { ...TheaterSeats.main, ...TheaterSeats.side };

    Object.entries(combinedSeats).forEach(( [_rowName , rowSeats]) => {
        rowSeats.forEach((value, index) => {
            if (value === 2) {
                rowSeats[index] = 1;
                console.log(_rowName, index ,"SELECTED")
            }
        });
    });

    return newTheaterSeatDetails;
};

// 
export const unSelectSeats = ( TheaterSeats: TheaterType, seats: ClientSelectedSeatType[]) :TheaterType =>  {
    
    const newTheaterSeatsDetails = { ...TheaterSeats };
  
    seats.forEach((seat) => {
      if (newTheaterSeatsDetails.mainSeats[seat.row]) {
        console.log(' unSelectSates_ Main Stage', seat.row ,seat.seatNumber)
        newTheaterSeatsDetails.mainSeats[seat.row][seat.seatNumber] = 0;
      } else if (newTheaterSeatsDetails.sideSeats[seat.row]) {
        console.log('unSelectSeats_ side Stage ', seat)
        newTheaterSeatsDetails.sideSeats[seat.row][seat.seatNumber] = 0;
      }
    })
    
  
    return newTheaterSeatsDetails;
};


