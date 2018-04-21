/**
 * Algorithmn for generating permutations:
 *   1. Create an array whose length is the multiplicative sum of each passed array's length
 *   2. Iterate through the array:
 *       2-0. Iterate through an array of the cost of each node
 *             2-0-0. Let "resources" initally equal the current index of the iteration at "2."
 *             2-0-1. Calculate the node to enter by the floor of the resources over cost (return value)
 *             2-0-2. Subtract the cost multipled by the node entered from resources
 * @param {any[][]} perms Array of arrays to generate permutations
 */
function makePermutations(perms) {
    let lengths = perms.map(a => a.length),
        // Gets the number of final child nodes each depth of the tree (the "cost" of passing that tree)
        sizes = [...Array(perms.length + 1)].map((a, i) => lengths.slice(i).reduce((a, b) => a * b, 1));

    // Create an array that's the cost of the entire structure
    return [...Array(sizes[0])].map((a, i) =>
        sizes.slice(1) // Skip the first size, which is just for the structure
            .map(cost => (
                out = Math.floor(i / cost), // Given our currently available resources, which one can we access? Flooring to ensure we never pass nodes we can't
                i -= cost * out, // Lose the number of passed nodes
                out
            ))
    );
}

async function filter(arr, callback) {
    return (await Promise.all(arr.map(async item => {
        return (await callback(item)) ? item : undefined
    }))).filter(i => i !== undefined)
}

Array.prototype.filterAsync = function (callback) { return filter(this, callback) };

module.exports = {
    makePermutations,
    filter
}
