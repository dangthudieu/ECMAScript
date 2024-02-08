const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

function getProductUpdate() {
    axios.get(API_URL + API_PRODUCT + productId)
        .then(response => {
            const product = response.data;
            console.log(product);

            document.getElementById("id").value = product.id;
            document.getElementById("name").value = product.name;
            document.getElementById("cate_id").value = product.cate_id;
            document.getElementById("price").value = product.price;
            const imageElement = document.getElementById("image");
            imageElement.src = "../../uploads/img/" + product.image;
            document.getElementById("description").value = product.description;
            document.getElementById("addDate").value = product.addDate;
            document.getElementById("status").value = product.status;

        })
        .catch(error => {
            console.error("Lỗi khi lấy thông tin sản phẩm", error);
        });
}

getProductUpdate();
function update() {
    const updatedProduct = {
        "id": document.getElementById("id").value,
        "name": document.getElementById("name").value,
        "cate_id": document.getElementById("cate_id").value,
        "price": document.getElementById("price").value,
        "image": document.getElementById("image").value,
        "description": document.getElementById("description").value,
        "addDate": document.getElementById("addDate").value,
        "status": document.getElementById("status").value,
    };

    // Gửi yêu cầu PUT để cập nhật sản phẩm
    axios.put(API_URL + API_PRODUCT + productId, updatedProduct)
        .then(response => {
            console.log(response.data);  // Log the response for debugging
            window.location.href = "../pages/tables.html";
        })
        .catch(error => {
            console.error("Lỗi khi cập nhật sản phẩm", error);
        });
}
