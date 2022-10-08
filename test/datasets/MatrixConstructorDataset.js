import GenerateCombinations from './GenerateCombinations'

export default [
    ...GenerateCombinations([undefined, null, [], {}, '', 0, -1], 2)
]