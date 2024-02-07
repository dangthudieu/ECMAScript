const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

function getProductUpdate() {
    axios.get(API_URL + API_PRODUCT + productId )
        .then(response => {
            const product = response.data;

            document.getElementById("name").value = product.name;
            document.getElementById("cate_id").value = product.cate_id;
            document.getElementById("price").value = product.price;
            document.getElementById("description").value = product.description;
            document.getElementById("status").value = product.status;

        })
        .catch(error => {
            console.error("Lỗi khi lấy thông tin sản phẩm", error);
        }); 
}

getProductUpdate();

function update() {
    const updatedProduct = {
        "name": document.getElementById("name").value,
        "cate_id": document.getElementById("cate_id").value,
        "price": document.getElementById("price").value,
        "description": document.getElementById("description").value,
        "status": document.getElementById("status").value,
    };

    // Gửi yêu cầu PUT để cập nhật sản phẩm
    axios.put(API_URL + API_PRODUCT + productId, updatedProduct)
        .then(response => {
            window.location.href = "../pages/tables.html";
        })
        .catch(error => {
            console.error("Lỗi khi cập nhật sản phẩm", error);
        });
}
