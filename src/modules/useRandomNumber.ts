const generateAutoNumber = (): number[] => {
  const newNumbers: number[] = []
  const interval = setInterval(() => {
    const newNumber = () => Math.floor(Math.random() * 49) + 1
    while (newNumbers.length < 6) {
      const number = newNumber()
      if (!newNumbers.includes(number)) {
        newNumbers.push(number)
      }
    }
  }, 300)
  // promise 사용해서 빼 볼 수 있을 것 같다. 
  setTimeout(() => {
    clearInterval(interval)
  }, 300 * 6 + 100)
  return newNumbers
}
export default generateAutoNumber
