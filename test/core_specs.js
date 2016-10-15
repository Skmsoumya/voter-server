import {List, Map} from "immutable";
import {expect} from "chai";

import {setEntries, next, vote} from "../src/core";

describe("app logic", () => {
	describe("Set Entries", () => {
		it("Set the entries to the state", () => {
			const state = Map();
			const entries = ["Trainspotting", "28 Days Later"];
			const newState = setEntries(state, entries);

			expect(newState).to.equal(Map({
				entries: List.of("Trainspotting", "28 Days Later")
			}));
		}); 
	});

	describe("next", () => {
		it("takes the next two entries under vote", () => {
			const state = Map({
				entries: List(["Trainspotting", "28 Days Later", "Sunshine"])
			});

			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of("Trainspotting", "28 Days Later")
				}),
				entries: List.of("Sunshine")
			}));
		});

		it("puts the winning entry back to the list of entries", () => {
			const state = Map({
				vote: Map({
					pair: List.of("Trainspotting", "28 Days Later"),
					tally: Map({
						"Trainspotting": 4,
						"24 Days Later": 2
					})
				}),
				entries: List.of("Sunshine", "Minions", "124 Hours")
			});

			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of("Sunshine", "Minions")
				}),
				entries: List.of("124 Hours", "Trainspotting")
			}));
		});

		it("puts both the voted entries into the entry list if its a tie", () => {
			const state = Map({
				vote: Map({
					pair: List.of("Trainspotting", "28 Days Later"),
					tally: Map({
						"Trainspotting": 2,
						"28 Days Later": 2
					})
				}),
				entries: List.of("Sunshine", "Minions", "124 Hours")
			});

			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of("Sunshine", "Minions")
				}),
				entries: List.of("124 Hours", "Trainspotting", "28 Days Later")
			}));
		}); 


		it("marks the winner when only one entry is left", () => {
			const state = Map({
				vote: Map({
					pair: List.of("Trainspotting", "28 Days Later"),
					tally: Map({
						"Trainspotting": 4,
						"28 Days Later": 2
					})
				}),

				entries: List()
			});

			const nextState = next(state);

			expect(nextState).to.equal(Map({
				winner: "Trainspotting"
			}));
		});
	});


	describe("vote", () => {
		it("creates a tally for the voted entry", () => {
			const state = Map({
				pair: List.of("Trainspotting", "28 Days Later"),
			});

			const nextState = vote(state,"Trainspotting");

			expect(nextState).to.equal(Map({
				pair: List.of("Trainspotting", "28 Days Later"),
				tally: Map({
					"Trainspotting": 1
				})
			}));
		});

		it("increments the tally of an voted entry", () => {
			const state = Map({
				pair: List.of("Trainspotting", "28 Days Later"),
				tally: Map({
					"Trainspotting": 3,
					"28 Days Later": 2
				})
			});

			const newState = vote(state, "Trainspotting");

			expect(newState).to.equal(Map({
				pair: List.of("Trainspotting", "28 Days Later"),
				tally: Map({
					"Trainspotting": 4,
					"28 Days Later": 2
				})
			}));
		});
	}); 
});