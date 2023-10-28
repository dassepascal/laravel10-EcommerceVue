export default  function useProduct(){

    const add = async(productId) => {
        let response = await axios.post('/api/products', {
            productId: productId
            });
            console.log(response);
        }

        // methode
        const getCount = async() => {
            

    return {
        add
    }
}
