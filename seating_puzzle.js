"use strict"
/* Helper function used in 3 areas so I thought it would be better to write the function once*/

/**
 * @param {array} seatMap 
 * @param {array} seatsToReserve 
 */
const seatReserver = (seatMap, seatsToReserve) => { 
	
	for (let seat_index = 0; seat_index < seatsToReserve.length; ++seat_index){
		let rowAndCol= seatsToReserve[seat_index].match(/\d+/g),
		r = parseInt(rowAndCol[0]-1),
		c = parseInt(rowAndCol[1]-1);
		seatMap[r][c].available = false;
	}
	return seatMap;
}

/**
 * @param {number} row
 * @param {number} col
   @param {array} reserved
 */
const build = (row , col, reserved) => {
	if(typeof row != "number" || typeof col != "number" || typeof reserved != "object"){
		console.log("Wrong Argument, Try Again")
		return map;
	}
let seatMap = [], rowArr = [], seat = {};

/* Initilizing 2D array that will hold a rowArr, each rowArr will be holding a seat object*/
for(let _rowStart = 0; _rowStart < row; ++_rowStart){
	for(let _colStart = 0; _colStart < col; ++_colStart){
		seat = {};
		seat["available"] = true;
		rowArr.push(seat);
	}
	
	seatMap.push(rowArr);
	rowArr = [];
}
		/* Return our function which returns the updated seat map */ 
return seatReserver(seatMap, reserved);;
}

/**
 * @param {array} map
 * @param {number} n
 */
const reserve = (map, n) => {
	
	if(typeof map != "object" || typeof n != "number" ){
		console.log("Wrong Argument, Try Again")
		return map;
	}
	
	/*Make sure the user isn't reserving more than 10 seats at a time*/ 
	if(n > 10){
		console.log("Sorry but you can not order more than 10 tickets at one time, Try again");
		return map;
	}
	/* Establish how many rows we're working with */
	let rows = map.length,
	
	/*Lexical needed to pull number from string ie R1C10 gives us 1 and 10  */ 
	lexical = /\d+/g;
	
	/* Go through each row in an attempt to find the best seats possible */
 	for(let _row = 0; _row < rows; ++_row){
		
		/* Using 3 seperate arrays depending on who holds the best seats */
   	 	let middleSeatsFound= [], lowSeatsFound = [], highSeatsFound = [],
		
		/* Our starting point will be the middle seat of the row */
		sweetSeat = Math.ceil(map[_row].length/2)-1,
		
		/* From there we will search high and low in order to provide our user the best seats in the house */
		lowSeatCheck = sweetSeat, highSeatCheck = sweetSeat,
		
		/* Seat Numbers*/
		lowSeatNumber, highSeatNumber,
		
		/*Row and cols */
		highRowAndCol, lowRowAndCol;
		
		/* If our main seat is avaiable then lets begin our search in the middle section of the row */
		if(map[_row][sweetSeat].available){
			
			/* Since our middle seat is avaiable the number of seats to search for is negated by 1 */
			let numToSearchFor = n-1;
			
			
			while(numToSearchFor != 0){
				/* Proceed to decrement the lowSeatCheck which will be the starting point for our search 
					and increment the highSeatCheck which will be the ending point.
				 */
				--lowSeatCheck;
				--numToSearchFor;
				
				if(numToSearchFor > 0){
					++highSeatCheck;
					--numToSearchFor;
				}
			}

			/*Check our middle section */
			for(let index = lowSeatCheck; index <= highSeatCheck; index++ ){
				
				
				if(map[_row][index].available){
					middleSeatsFound.push(`R${_row+1}C${index+1}`);	
				}
				else{
					middleSeatsFound = [];
				}
				/*If our middle array equals n then return */
				if(middleSeatsFound.length == n){
					console.log(`${middleSeatsFound[0]}-${middleSeatsFound[middleSeatsFound.length-1]}`);
					return seatReserver(map, middleSeatsFound);
					
				}
			}

		}
		
		/*If the middle seat of our row is not avaiable then lets proceed to check the lower end of seats first */
		for(;lowSeatCheck >= 0; --lowSeatCheck ){
			
			/* If our seat is avaiable then unshift it to the front of the array */
			if(map[_row][lowSeatCheck].available){
				
				lowSeatsFound.unshift(`R${_row+1}C${lowSeatCheck+1}`);
			}
			
			/* Else we need to start our seat array over to ensure that the seats are consecetive */
			else{
				lowSeatsFound = [];
			}
			
			/* If the length of our array equals the number of seats we're searching for then end the for loop*/
			if(lowSeatsFound.length == n){
				lowSeatCheck = 0;
				
				/* Gather up our seat number because we'll be needing it */
				lowRowAndCol = lowSeatsFound[lowSeatsFound.length-1].match(lexical);
				lowSeatNumber = parseInt(lowRowAndCol[1]-1);
				
			}
		}
		
		/* Check our higher section regardless  to ensure the best seats were found */ 
		for(;highSeatCheck < map[_row].length; highSeatCheck++ ){
			
			if(map[_row][highSeatCheck].available){
				highSeatsFound.push(`R${_row+1}C${highSeatCheck+1}`);
				
				/* If we have a seat in our highSeatFound array then get its seat number to compare it to that of the lowSeat array */
			    highRowAndCol= highSeatsFound[0].match(lexical);
				highSeatNumber = parseInt(highRowAndCol[1]-1);
		
			}
			else{
				highSeatsFound = [];
			}
			
			
			/* If both of our arrays contain elements and our highSeatNumber is greater or equal to our lowSeatNumber then return */
			if(highSeatsFound.length > 0 && lowSeatsFound.length == n && 
				highSeatNumber - sweetSeat >= sweetSeat - lowSeatNumber){
				console.log(`${lowSeatsFound[0]}-${lowSeatsFound[lowSeatsFound.length-1]}`);
				return seatReserver(map, lowSeatsFound);
			}
			/* Else if the length of our array equals the number of seats we're searching for then return */
			 else if(highSeatsFound.length == n){
				console.log(`${highSeatsFound[0]}-${highSeatsFound[highSeatsFound.length-1]}`);
				return seatReserver(map, highSeatsFound);
			}
			/*Or if we are at the end of our loop and we've only found seats in the lower section */
			else if(highSeatCheck == map[_row].length - 1 && lowSeatsFound.length == n){
				console.log(`${lowSeatsFound[0]}-${lowSeatsFound[lowSeatsFound.length-1]}`);
				return seatReserver(map, lowSeatsFound);
			}
		
		}

	}
	console.log("Not Avaiable")
	return map;

	
	
}
