"use strict"
/* Helper function used in 2 areas so I thought it would be better to write the function once*/
const seatReserver = (seatMap, seatsToReserve) => { 
	for (let seat_index = 0; seat_index < seatsToReserve.length; ++seat_index){
		let r = seatsToReserve[seat_index][1] - 1;
		let c = seatsToReserve[seat_index][3] - 1;
		seatMap[r][c].available = false;
	}
	return seatMap;
}


const build = (row , col, reserved) => {
	
let seatMap = [], rowArr = [], seat = {};

for(let _rowStart = 0; _rowStart < row; ++_rowStart){
	for(let _colStart = 0; _colStart < col; ++_colStart){
		seat = {};
		seat["number"] = _colStart+1;
		seat["available"] = true;
		rowArr.push(seat);
	}
	seatMap.push(rowArr);
	rowArr = [];
}
		
return seatReserver(seatMap, reserved);;
}

const reserve = (map, n) => {
	if(n >= 10){
		console.log("Sorry but you can not order that many tickets at one time");
		return;
	}
	let rows = map.length;
	
 	for(let _row = 0; _row < rows; ++_row){
   	 	let middleSeatsFound= [], lowSeatsFound = [], highSeatsFound = [],
		sweetSeat = Math.ceil(map[0].length/2)-1,
		primary = [], secondary = [],
		lowSeatsPriority = false, highSeatsPriority = false,
		lowSeatCheck = sweetSeat-1, highSeatCheck = sweetSeat+1;
		
		// if(map[_row][sweetSeat].available){
// 			primary.push(`R${_row+1}C${sweetSeat+1}`);
// 		}
// 		else{
// 			primary.push(map[_row][lowSeatCheck]);
// 				lowSeatsPriority = true;
// 		}
//
// 		while(primary.length != n || secondary.length != n || lowSeatCheck >= 0 || highSeatCheck < n){
//
// 			if(map[_row][lowSeatCheck.avaiable]){
// 				if(!highSeatsPriority){
// 					if(primary[0][3] - map[_row][lowSeatCheck].seat == 1 || primary.length == 0){
// 						primary.unshift(`R${_row+1}C${lowSeatCheck+1}`);
// 					}
// 					else{
// 						primary = [];
// 					}
// 				}
// 				else{
// 					if(secondary[0][3] - map[_row][lowSeatCheck].seat == 1 || secondary.length == 0){
// 						secondary.unshift(`R${_row+1}C${lowSeatCheck+1}`);
// 					}
// 					else{
// 						secondary = [];
// 					}
// 				}
// 			}
// 			else if(!lowSeatsPriority){
// 				highSeatsPriority = true;
// 			}
//
// 			if(map[_row][highSeatCheck.avaiable]){
// 				if(!lowSeatsPriority){
// 					if(map[_row][highSeatCheck].seat - primary[primary.length-1][3] == 1 || primary.length == 0){
// 						primary.push(`R${_row+1}C${highSeatCheck+1}`);
// 					}
// 					else{
// 						primary = [];
// 					}
// 				}
// 				else{
// 					if(map[_row][highSeatCheck].seat - secondary[secondary.length-1][3] || secondary.length == 0){
// 						secondary.unshift(`R${_row+1}C${lowSeatCheck+1}`);
// 					}
// 					else{
// 						secondary = [];
// 					}
// 				}
// 			}
// 			else if(!highSeatsPriority){
// 				lowSeatsPriority = true;
// 			}
//
//
//
// 			if(primary.length == n){
// 				return `${primary[0]}-${primary[primary.length-1]}`;
// 			}
//
// 			else if(secondary.length == n){
// 				return `${secondary[0]}-${secondary[secondary.length-1]}`;
// 			}else{
// 				lowSeatCheck--;
// 				highSeatCheck++;
// 			}
//
//
// 		}
//
//
// 	}
		if(map[_row][sweetSeat].available){
			let numToSearchFor = n-1;

			while(numToSearchFor != 0){
				--lowSeatCheck;
				--numToSearchFor;

				if(numToSearchFor > 0){
					++highSeatCheck;
					--numToSearchFor;
				}
			}


			for(var index = lowSeatCheck; index <= highSeatCheck; ++index ){
				if(middleSeatsFound.length == n){
					console.log(`${middleSeatsFound[0]}-${middleSeatsFound[middleSeatsFound.length-1]}`);
					return seatReserver(map, middleSeatsFound);

				}
				else if(map[_row][index].available){
					middleSeatsFound.push(`R${_row+1}C${index}`);
				}
				else{
					middleSeatsFound = [];
				}
			}


		}

		for(;lowSeatCheck >= 0; --lowSeatCheck ){
			if(lowSeatsFound.length == n){
				lowSeatCheck = 0;
			}
			else if(map[_row][lowSeatCheck].available){
				lowSeatsFound.unshift(`R${_row+1}C${lowSeatCheck+1}`);
			}
			else{
				lowSeatsFound = [];
			}
		}

		for(;highSeatCheck < map[_row].length; ++highSeatCheck ){
			if(highSeatsFound.length == n && lowSeatsFound.length == n &&
			   highSeatsFound[0][3] - sweetSeat > sweetSeat - lowSeatsFound[lowSeatsFound.length-1][3]){
				console.log(`${lowSeatsFound[0]}-${lowSeatsFound[lowSeatsFound.length-1]}`);
				return seatReserver(map, lowSeatsFound);
			}
			 else if(highSeatsFound.length == n){
				 console.log( highSeatsFound[0][3])
				console.log (lowSeatsFound[lowSeatsFound.length-1][3])
				console.log(`${highSeatsFound[0]}-${highSeatsFound[highSeatsFound.length-1]}`);
				return seatReserver(map, highSeatsFound);
			}

			else if(map[_row][highSeatCheck].available){
				highSeatsFound.push(`R${_row+1}C${highSeatCheck+1}`);
			}
			else{
				highSeatsFound = [];
			}
		}

	}
	console.log("Not Avaiable")
	return map;

	
	
}
