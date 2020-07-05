function scoring(type) {
    if (type === 'basic') return 1
    if (type === 'moderate') return 2
    if (type === 'strict') return 3
}

module.exports = scoring;