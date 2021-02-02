export const Witness = (witness) => {
    return `
        <div class="witnesses">
            <h4 class="witness_name">Witness Name: ${witness.name}</h4>
            <div class="witness_statements">Witness Statement: ${witness.statements}</div>
        </div>
    `
}