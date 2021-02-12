const loadData = async (paras) => {
  const URL = `https://baconipsum.com/api/?type=all-meat&paras=${paras}`;
  return await fetch(URL).then((res) => res.json());
};

export default loadData;
