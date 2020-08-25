// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]

// Validation function to verify if a credit card number is valid or not (main function)
const validateCred = (batchArray) => {
  const validNums = [];
  const invalidNums = [];
  for (let cardNum of batchArray) {
    let lunhValue = sumCreditArray(lunhAlgorithm(cardNum));
    if (lunhValue % 10 === 0) {
      console.log('valid');
      validNums.push(cardNum);
    }
    else {
      console.log('invalid');
      invalidNums.push(cardNum);
    }
  }
  return {
    validNums,
    invalidNums
  };
};

//Transforms credit card number passed in with Lunh Algorithm
const lunhAlgorithm = (creditCardNumber) => {
  let newCreditArray = [];
  let j = 2;
    for (let i = creditCardNumber.length-2; i >= 0; i--) {

      if (isEven(j)) {
        let newArrayNum = creditCardNumber[i] * 2;
        if (newArrayNum > 9) {
          newArrayNum = newArrayNum - 9;
        }
        newCreditArray.unshift(newArrayNum);
      }
      else {
        let newArrayNum = creditCardNumber[i];
        newCreditArray.unshift(newArrayNum);
      }
      j++;
    }
    newCreditArray.push(creditCardNumber[creditCardNumber.length - 1]);
    return newCreditArray;
};

//Generic function to check if value is even
const isEven = (num) => {
  return num % 2 === 0;
};

//Adds up all the numbers in the new credit card array after it has been modified by the Lunh Algorithm
const sumCreditArray = (newCreditArray) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return newCreditArray.reduce(reducer);
};

const findInvalidCards = (cardNumsToTest) => {
  const invalidCards = validateCred(cardNumsToTest).invalidNums;
  return invalidCards;
};

const idInvalidCompanies = (invalidCards) => {
  const creditCardCompanies = [[3, 4, 5, 6],['Amex', 'Visa', 'Mastercard', 'Discover']];
  const invalidCardArray = [];
  for (let card of invalidCards) {
    if (card[0] === creditCardCompanies[0][0] && !invalidCardArray.includes(creditCardCompanies[1][0])) {
      invalidCardArray.push(creditCardCompanies[1][0]);
    }
    else if (card[0] === creditCardCompanies[0][1] && !invalidCardArray.includes(creditCardCompanies[1][1])) {
      invalidCardArray.push(creditCardCompanies[1][1]);
    }
    else if (card[0] === creditCardCompanies[0][2] && !invalidCardArray.includes(creditCardCompanies[1][2])) {
      invalidCardArray.push(creditCardCompanies[1][2]);
    }
    else if (card[0] === creditCardCompanies[0][3] && !invalidCardArray.includes(creditCardCompanies[1][3])) {
      invalidCardArray.push(creditCardCompanies[1][3]);
    }
    //find a way to not output this by default
    else if (!creditCardCompanies[0].includes(card[0])){
      invalidCardArray.push('Company not found.');
    }
  }
  return invalidCardArray;
};

const listInvalidCards = findInvalidCards(batch);
console.log(listInvalidCards);

const companiesWithInvalidCards = idInvalidCompanies(listInvalidCards);
console.log(companiesWithInvalidCards);
