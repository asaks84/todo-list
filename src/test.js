// Função para atualizar um objeto de forma imutável
const updateObject = (obj, updates) => {
  const updatedObj = { ...obj }; // Clona o objeto original

  // Atualizar as chaves do objeto com os valores fornecidos em 'updates'
  Object.entries(updates).forEach(([key, value]) => {
    // Se o valor for um objeto e o valor correspondente no objeto original também for um objeto,
    // chame recursivamente a função de atualização para atualizar o objeto aninhado.
    if (typeof value === 'object' && typeof obj[key] === 'object') {
      updatedObj[key] = updateObject(obj[key], value);
    } else {
      // Caso contrário, simplesmente atribua o novo valor à chave correspondente
      updatedObj[key] = value;
    }
  });

  return updatedObj;
};

// Função para aplicar atualizações cumulativas em um objeto
function applyUpdates(obj, ...updates) {
  const originalObj = { ...obj }; // Clona o objeto original
  const history = []; // Array para armazenar o histórico de atualizações
  let objParam = obj;

  // Função getter que permite acessar tanto os valores originais quanto os valores atualizados
  const getValue = (key) => {
    // Função interna para buscar valores em chaves aninhadas
    const getValueByNestedKey = (objI, nestedKeys) => nestedKeys.reduce((nestedObj, nestedKey) => {
      // Verifica se o objeto atual é nulo ou não é um objeto
      if (!nestedObj || typeof nestedObj !== 'object') {
        return undefined; // Retorna undefined se a propriedade não existir ou não for um objeto
      }
      // Retorna o próximo objeto aninhado
      return nestedObj[nestedKey];
    }, objI); // Inicializa o acumulador com o objeto original

    // Verifica se a chave foi atualizada em alguma das atualizações
    const updatedValue = updates.reduce((acc, update) => {
      const nestedKeys = key.split('.'); // Divide a chave em chaves aninhadas
      const value = getValueByNestedKey(update, nestedKeys); // Busca o valor aninhado
      return value !== undefined ? value
        : acc; // Retorna o valor se encontrado, senão mantém o valor acumulado
    }, undefined);

    // Se o valor atualizado foi encontrado, retorna-o; caso contrário, retorna o valor original
    return updatedValue !== undefined ? updatedValue : originalObj[key];
  };

  // Itera sobre cada atualização e aplica ao objeto
  updates.forEach((update) => {
    objParam = updateObject(objParam, update); // Aplica a atualização ao objeto
    history.push({ ...update }); // Adiciona uma cópia da atualização ao histórico
  });

  return {
    updatedObj: objParam,
    getValue,
    history,
  };
}

// Exemplo de objeto original
const originalObj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
    },
  },
};

// Atualizações desejadas
const updates1 = {
  a: 10,
  b: {
    c: 20,
  },
};

const updates2 = {
  b: {
    d: {
      e: 30,
    },
  },
};

const update3 = { a: 100 };

// Aplica as atualizações cumulativas no objeto original
const { updatedObj, getValue, history } = applyUpdates(
  originalObj,
  updates1,
  updates2,
);
applyUpdates(updatedObj, update3);
console.log(updatedObj);
console.log('a', getValue('a')); // Output: 10
// console.log(getValue('b')); // Output: { c: 20, d: { e: 30 } }
console.log(getValue('b.d.e')); // Output: 30
console.log(history); // Output: [{ a: 10, b: { c: 20 } }, { b: { d: { e: 30 } } }]
