export const searchEnteredTags = (value: string): string[] => {
    const splitedValue = value.split(' ')
    const cache: string[] = []
    splitedValue.forEach(word => {
      if(word[0] === '#') {
        const slicedWord = word.slice(1, word.length)
        if(!cache.includes(slicedWord)) {
            const arr: string[] = slicedWord.split('#')
            cache.push(...arr)
        }
      }
    })
    const enteredTags = cache.map(newTag => {
      return newTag
    })
    return enteredTags
}