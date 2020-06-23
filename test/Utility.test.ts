import Utility from '../src/Utility/Utility';

describe("src/Utility", () => {

  it('keyGenerator function', () => {
    const string1 = 'str1';
    const string2 = 'str2';
    const string3 = 'str3'; 
    expect(Utility.keyGenerator(string1, string2, string3)).toBe(`${string1}.${string2}.${string3}`);
  });
});