build = (row , col, reserved) => {
	
let seatMap = [], rowArr = [], seat = {};

for(let _rowStart = 0; _rowStart < row; ++_rowStart){
	for(let _colStart = 0; _colStart < col; ++_colStart){
		seat = {};
		seat["seat"] = _colStart+1;
		seat["available"] = true;
		rowArr.push(seat);
	}
	seatMap.push(rowArr);
	rowArr = [];
}
	
	
	for (let r_seats = 0; r_seats < reserved.length; ++r_seats){
		let r = reserved[r_seats][1] - 1;
		let c = reserved[r_seats][3] - 1;
		seatMap[r][c].available = false;
		console.log(`Row: ${r} Col: ${c}`);
	}
	return seatMap;
}

reserve = (map, n) => {
	let middleSeatsFound= [], lowSeatsFound = [], highSeatsFound = [];
	let rows = map.length;
	let sweetSeat = Math.ceil(map[0].length/2)-1;
	let lowSeatCheck = sweetSeat ;
 	let highSeatCheck = sweetSeat ;
	
	
	for(let _row = 0; _row < rows; ++_row){
		
		if(map[_row][sweetSeat].available){
			let numToSearchFor = n-1; 
			
			// middleSeatsFound.push(`R${_row+1}C${sweetSeat+1}`)
			
			// while(numToSearchFor != 0 || middleSeatsFound.length != n){
//
// 				if(numToSearchFor > 0){
//
// 				if(map[_row][lowSeatCheck].available){
// 					--numToSearchFor;
//
// 					if(middleSeatsFound[0].seat - lowSeatCheck == 1){
// 					middleSeatsFound.unshift(`R${_row+1}C${lowSeatCheck+1}`);
// 					}
// 				}
// 				--lowSeatCheck;
// 			}
//
// 				if(numToSearchFor > 0){
//
// 					if(map[_row][highSeatCheck].available){
// 						--numToSearchFor;
// 						console.log(highSeatCheck);
//
// 						if (highSeatCheck - middleSeatsFound[middleSeatsFound.length-1].seat  == 1)
// 						middleSeatsFound.push(`R${_row+1}C${highSeatCheck+1}`);
// 					}
// 					++highSeatCheck;
// 				}
//
//
// 				// --lowSeatCheck;
// // 				++highSeatCheck;
//
// 			}
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
					return `${middleSeatsFound[0]}-${middleSeatsFound[middleSeatsFound.length-1]}`;
				}
				else if(map[_row][index].available){
					middleSeatsFound.push(`R${_row+1}C${index}`);
				}
				else{
					middleSeatsFound = [];
				}
				console.log(map[_row][index]);
			}
						//
			// for(;sweetSeatStart <= sweetSeatEnd; ++sweetSeatStart ){
			// 	if(seatsFound.length == n){
			// 		return `${seatsFound[0]}-${seatsFound[seatsFound.length-1]}`;
			// 	}
			// 	else if(map[_row][sweetSeatStart].available){
			// 		seatsFound.push(`R${_row}C${sweetSeatStart+1}`);
			// 	}
			// 	else{
			// 		seatsFound = [];
			// 	}
			// 	console.log(map[_row][sweetSeatStart]);
			// }
			
			// lowSeatCheck = sweetSeatStart-1;
// 			highSeatCheck = sweetSeatEnd+1;
		
		seatsFound = [];
			
		}
		
		for(;lowSeatCheck >= 0; --lowSeatCheck ){
			if(lowSeatsFound.length == n){
				// return `${lowSeatsFound[0]}-${lowSeatsFound[seatsFound.length-1]}`;
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
			if(highSeatsFound.legth > 0 && lowsSeatsFound.length > 0 && 
			   highSeatsFound[0].seat - sweetSeat > sweetSeat - lowSeatsFound[lowSeatsFound.length-1].seat){
				return `${lowSeatsFound[0]}-${lowSeatsFound[seatsFound.length-1]}`;
				
			}
			 else if(highSeatsFound.length == n){
				return `${highSeatsFound[0]}-${highSeatsFound[highSeatsFound.length-1]}`;
			}
		
			else if(map[_row][highSeatCheck].available){
				highSeatsFound.push(`R${_row+1}C${highSeatCheck+1}`);
			}
			else{
				highSeatsFound = [];
			}
		}
		
	}

	
	
}
