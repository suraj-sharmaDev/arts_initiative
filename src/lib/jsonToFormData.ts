const jsonToFormData = (data: data) => {
  const formData = new FormData();

  for (const untypedKey in data) {
    const key = untypedKey as string;
    formData.append(key, data[key]);
  }

  return formData;
};

type data = {
  [key: string]: any;
};

export default jsonToFormData;
