#!/usr/bin/env node

import { chessBoard} from "./knightTravails.js";
const chessboard = new chessBoard(8);

//Moves.
chessboard.knightMoves([0,0],[3,3]); 
chessboard.knightMoves([3,3],[0,0]); 
chessboard.knightMoves([0,0],[7,7]);
chessboard.knightMoves([3,3],[4,3]);
chessboard.knightMoves([0,0],[0,0]);

