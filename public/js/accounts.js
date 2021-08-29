export async function getAccounts() {
    const data = await fetch('/accounts');
    const accounts = await data.json();

    accounts.forEach(account => {
        document.querySelector('.accounts').innerHTML += `
            <div class="row" index="${account.index}">
                <div class="left">
                    <p>${account.site}</p>
                </div>
                <div class="center">
                    <input type="username" placeholder="username" class="username" readonly value="${account.username}">
                </div>
                <div class="right">
                    <div class="password">
                        <input type="password" placeholder="password" class="pass" readonly value="${account.password}">
                    </div>
                    <div class="buttons">
                        <svg id="view" class="options" title="View password" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 11c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"></path><path d="M12 10c-1.084 0-2 .916-2 2s.916 2 2 2 2-.916 2-2-.916-2-2-2z"></path></svg>
                        <svg id="copy" class="options" title="Copy password" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path></svg>
                        <div class="dots">
                            <svg id="dots" class="options" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                            <div class="dropdown">
                                <ul>
                                    <li id="edit">Edit Account</li>
                                    <li id="delete">Delete Account</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    })
}
