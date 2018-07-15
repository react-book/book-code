export default (n,z) => {
    var sol = [];

	var _solve = function(board){
		var nx = board.length;

		if (board.length === n){
			sol.push(board);
			return;
		}

		for (var i = 0; i<n; i++){
			var legal = true;
			for (var j=0; j<board.length; j++){
				var ox = j;
				var oy = board[j];
				var slope = Math.abs((nx-ox)/(i-oy));
				if(i===oy || slope === 1){
				    legal = false;
				    break;
				}
			}
			if(legal){
				board.push(i);
				_solve(board)
				board.pop();
			}
		}
	}

	if(z!==undefined){
		_solve([z])
	} else {
		_solve([])
	}

	return sol;
}