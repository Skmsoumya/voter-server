import {expect} from "chai";
import {List, Map} from "immutable";

describe("immutablity", () => {
	describe("a number", () => {
		function increment(currentState) {
			return currentState + 1;
		};


		it("is immutable", () => {
			let state = 42;
			let newState = increment(state);

			expect(newState).to.equal(43);
			expect(state).to.equal(42);
		});
	});


	describe("A list", () => {
		function addMovie(currentState, movie) {
			return currentState.push(movie);
		};

		it("is immutable", () => {
			let state = List.of("TrainSpotting", "28 Days Later");
			let nextState = addMovie(state, "Thunder");

			expect(nextState).to.equal(List.of("TrainSpotting", "28 Days Later", "Thunder"));
			expect(state).to.equal(List.of("TrainSpotting", "28 Days Later"));
		});
	});


	describe("A tree", () => {
		it("is immutable", () => {

			function addMovie(currentState, movie) {
				return currentState.update("movies", (movies) => movies.push(movie));
			}

			let state = Map({
				movies: List.of("TrainSpotting", "28 Days Later")
			});

			let nextState = addMovie(state, "Thunder");

			expect(nextState).to.equal(Map({
				movies: List.of("TrainSpotting", "28 Days Later", "Thunder")
			}));
			expect(state).to.equal(Map({
				movies: List.of("TrainSpotting", "28 Days Later")
			}));
		});
	});
});