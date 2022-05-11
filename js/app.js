const revenues = [
    new Revenue('Salary', 2100.00),
    new Revenue('Car Sale', 1500.00),
];

const egresses = [
    new Egress('Rent Apartment', 1000.00),
    new Egress('Clothing', 500.00)
];

let loadApp = () => {
    loadHeader();
    loadRevenue();
    loadEgress();
}

let totalRevenue = () => {
    let totalRevenue = 0;
    for (let revenue of revenues) {
        totalRevenue += revenue.value;
    }
    return totalRevenue;
}

let totalEgress = () => {
    let totalEgress = 0;
    for (let egress of egresses) {
        totalEgress += egress.value;
    }
    return totalEgress;
}

let loadHeader = () => {
    let budget = totalRevenue() - totalEgress();
    let percentEgress = totalEgress() / totalRevenue();
    document.getElementById('budget').innerHTML = formatCoin(budget);
    document.getElementById('percentEgress').innerHTML = percent(percentEgress);
    document.getElementById('revenues').innerHTML = formatCoin(totalRevenue());
    document.getElementById('egresses').innerHTML = formatCoin(totalEgress());
}

const formatCoin = value => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimunFractionDigits: 2 });
}

const percent = value => {
    return value.toLocaleString('en-US', { style: 'percent', minimunFractionDigits: 2 });
}

const loadRevenue = () => {
    let revenueHTML = '';
    for (let revenue of revenues) {
        revenueHTML += createRevenueOrEgressHTML(revenue, 'revenue')
    }
    document.getElementById('list-revenue').innerHTML = revenueHTML;
}

const loadEgress = () => {
    let egressHTML = '';
    for (let egress of egresses) {
        egressHTML += createRevenueOrEgressHTML(egress, 'egress')
    }
    document.getElementById('list-egress').innerHTML = egressHTML;
}

const createRevenueOrEgressHTML = (object, type) => {
    let valueHTML = '';
    if (type == 'revenue') {
        valueHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion"> ${object.description} </div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor"> ${formatCoin(object.value)} </div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline" 
                        onclick='deleteElement(${object.id}, "${type}");'></ion-icon>
                    </button>
                </div>
            </div>
        </div>`;
    } else if (type == 'egress') {
        valueHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${object.description}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor"> ${formatCoin(object.value)}</div>
                <div class="elemento_porcentaje"> ${percent(object.value/totalEgress())} </div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline"
                        onclick='deleteElement(${object.id}, "${type}");'></ion-icon>
                    </button>
                </div>
            </div>
        </div>`;
    }

    return valueHTML;
}

const deleteElement = (id, type) => {
    let indexToDelete = '';
    if (type == 'revenue') {
        indexToDelete = revenues.findIndex(revenue => revenue.id === id);
        revenues.splice(indexToDelete, 1);
    } else if (type == 'egress') {
        indexToDelete = egresses.findIndex(egress => egress.id === id);
        egresses.splice(indexToDelete, 1);
    }
    loadRevenue();
    loadEgress();
    loadHeader();
}

let addData = () => {
    let form = document.forms['form'];
    let type = form['type'];
    let description = form['description'];
    let value = form['value'];
    if (description.value !== '' && value.value !== '') {
        if (type.value === 'revenue') {
            revenues.push(new Revenue(description.value, +value.value));
        } else if (type.value === 'egress') {
            egresses.push(new Egress(description.value, +value.value));
        }
    }
    loadHeader();
    loadRevenue();
    loadEgress();

}