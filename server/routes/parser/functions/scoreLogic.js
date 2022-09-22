function scoring(type) {
    if (type === 'basic') return 2
    if (type === 'moderate') return 3
    if (type === 'strict') return 4
    return 2
}

module.exports = scoring;