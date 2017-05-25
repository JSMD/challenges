let elements = [
  'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al',
  'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe',
  'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y',
  'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb',
  'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd',
  'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir',
  'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn', 'Fr', 'Ra', 'Ac',
  'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No',
  'Lr', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl',
  'Mc', 'Lv', 'Ts', 'Og'
]

class ElementSearch {
  get_variants (str) {
    this.search_for = str;
    this.start_search(str, '', []);
  }
  start_search (str, word, combination) {
    let flag = false;
    if (word.length == str.length) {
      console.log('word', word, ', combination', combination);
      return;
    }
    for (let i = 0, len = elements.length; i < len; i++) {
      let new_word = word + elements[i];
      if (str.toLowerCase().indexOf(new_word.toLowerCase()) === 0) {
        flag = true;
        let newcomb = combination.slice(0);
        newcomb.push(elements[i]);
        this.start_search(str, new_word, newcomb);
      }
    }
    if (!flag) {
      let new_str = str.slice(0, word.length) + str.slice(word.length + 1);
      this.start_search(new_str, word, combination);
    }
  }
}

d = new ElementSearch();
d.get_variants('Nicu')
d.get_variants('Moldova')