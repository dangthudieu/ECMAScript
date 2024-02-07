
let API_URL = "http://localhost:3000/";
let API_PRODUCT = 'products/';

// sản phẩm admin


function productsTable(data) {
    let html = "";
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const statusText = element.status == 1 ? "Hiển thị" : "ẩn";
        html += `
        <tr>
            <td>
                <span class="text-secondary ml-5 text-xs font-weight-bold">${i + 1}</span>
            </td>
            <td>
                <div class="d-flex px-2 py-1">
                    <div>
                        <img src="../../uploads/img/${element.image}" class="avatar avatar-sm me-3" alt="user1">
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">${element.name}</h6>
                    </div>
                </div>
            </td>
            <td>
                <p class="text-xs text-center font-weight-bold mb-0">${element.price} VNĐ</p>
            </td>
            <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-success">${statusText}</span>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">${element.addDate}</span>
            </td>
            <td class="align-middle">
            <a href="#" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" onclick="editProduct(${element.id})" data-original-title="Edit user">
                Edit
            </a> 
            </td>
            <td class="align-middle">
            <a href="#" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" onclick="deleteProductId(${element.id})" data-original-title="Delete product">
            Delete
         </a>
            </td>
            <td></td>
        </tr>`;
    }

    return html;
}

function editProduct(productId) {
    window.location.href = `../pages/edit_product.html?id=${productId}  `;
} 

function deleteProduct(productId) {
    console.log(productId);
    axios.delete(API_URL + API_PRODUCT + productId)
        .then(response => {
            window.location.href = "../pages/tables.html";
        })
        .catch(error => {
            console.error("Lỗi khi xóa sản phẩm", error);
        });
}

function deleteProductId(productId) {
    if (confirm("Bạn chắc xóa chứ!")) {
        deleteProduct(productId);
    }
}




async function fetchAPI() {
    try {
        const response = await fetch(API_URL + API_PRODUCT);
        const data = await response.json();
        document.getElementById("products_admin").innerHTML = productsTable(data);
    } catch (error) {
        console.error("không fecth được data:", error);
    }
}





//thêm sản phẩm vào admin
function addProduct() {

    //tạo hàm date tự động cho form nhập
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const formatDate = `${day}/${month}/${year}`

    const name = document.getElementById("name").value;
    const cate_id = document.getElementById("cate_id").value;
    const price = document.getElementById("price").value;

    //Xử lí hàm mang file hìnhconst 
    const imageInput = document.getElementById("image").files[0];
    const image = imageInput.files.length > 0 ? imageInput.files[0] : null;


    


    const description = document.getElementById("description").value;
    const addDate = formatDate;
    const status = document.getElementById("status").value;


    // bắt lỗi chung 
    if (!name || !cate_id || !price || !image || !description || !addDate || !status) {
        alert("Vui lòng nhập đầy đủ form có *.");
        return false;
    }

    //tạo 1 ofject chứ các thông tin valeu nhập từ form 
    const newProduct = {
        "name": name,
        "cate_id": cate_id,
        "price": price,
        "image": image,
        "description": description,
        "addDate": addDate,
        "status": status,
    };
    axios.post(API_URL + API_PRODUCT, newProduct)
        .then(function (response) {
            window.location.href = '../pages/tables.html';
        })
        .catch(function (error) {
            alert('Không thể thểm sản phẩm', error)
        })

}



fetchAPI()