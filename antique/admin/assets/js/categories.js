
let API_URL = "http://localhost:3000/";
let API_CATEGORIES = 'categories/';

// sản phẩm admin


function categoriesTable(data) {
    let html = "";
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        html += `
    <tr>
        <td>
            <span class="text-secondary text-center ml-5 text-xs font-weight-bold">${i + 1}</span>
        </td>
        <input type="hidden" id="id" name="id" value="${element.id}"/>
    
        <td>
            <p class="text-xs  font-weight-bold mb-0">${element.name} </p>
        </td>

        <td class="align-middle">
        <a href="#" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" onclick="editCate(${element.id})" data-original-title="Edit user">
            Edit
        </a> 
        </td>
        <td class="align-middle">
        <a href="#" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" onclick="deleteCate('${element.id}')" data-original-title="Delete">
            Delete
        </a>
        </td>
    </tr>`;

    }

    return html;
}

function editCate(id) {
    window.location.href = `../pages/edit_categories.html?id=${id}  `;
}

function deleteCateId(id) {
    axios.delete(API_URL + API_CATEGORIES + id)
        .then(response => {
            window.location.href = "../pages/tables_categories.html";
        })
        .catch(error => {
            console.error("Lỗi khi xóa danh mục", error);
        });
}

function deleteCate(id) {
    if (confirm("Bạn chắc xóa chứ!")) {
        deleteCateId(id);
    }
}



async function fetchAPI() {
    try {
        const response = await fetch(API_URL + API_CATEGORIES);
        const data = await response.json();
        document.getElementById("categories_admin").innerHTML = categoriesTable(data);
    } catch (error) {
        console.error("không fecth được data:", error);
    }
}





//thêm sản phẩm vào admin
function addCate() {

    //tạo hàm date tự động cho form nhập
    

    const id = Math.random(999).toString();
    const name = document.getElementById("name").value;


    // bắt lỗi chung 
    if (!name) {
        alert("Vui lòng nhập đầy đủ form có *.");
        return false;
    }

    //tạo 1 ofject chứ các thông tin valeu nhập từ form 
    const newCate = {
        "id" : id,
        "name": name,
        
    };
    axios.post(API_URL + API_CATEGORIES, newCate)
        .then(function (response) {
            window.location.href = '../pages/tables_categories.html';
        })
        .catch(function (error) {
            alert('Không thể thêm danh mục', error)
        })

}



fetchAPI()