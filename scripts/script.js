let tickets = []; // Array to store tickets

// Function to raise a ticket (Student Section)
document.getElementById('ticketForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const issue = document.getElementById('issue').value;
  const ticket = {
    id: tickets.length + 1,
    issue: issue,
    status: 'Open',
    remarks: [],
    timestamp: new Date().toLocaleString() // Add timestamp
  };
  tickets.push(ticket);
  showNotification('Ticket raised successfully!');
  document.getElementById('issue').value = '';
  displayTickets();
});

// Function to display tickets
function displayTickets(filterStatus = 'All') {
  const ticketList = document.getElementById('ticketList');
  if (ticketList) {
    const filteredTickets = filterStatus === 'All' ? tickets : tickets.filter(ticket => ticket.status === filterStatus);
    ticketList.innerHTML = filteredTickets
      .map(
        (ticket) => `
        <li>
          <strong>Ticket ID:</strong> ${ticket.id}<br>
          <strong>Issue:</strong> ${ticket.issue}<br>
          <strong>Status:</strong> ${ticket.status}<br>
          <strong>Raised On:</strong> ${ticket.timestamp}<br>
          ${ticket.remarks.length > 0 ? `<strong>Remarks:</strong> ${ticket.remarks.join(', ')}` : ''}
        </li>
      `
      )
      .join('');
  }
}

// Function to resolve tickets (Supervisor Section)
document.getElementById('resolveTicket')?.addEventListener('click', function () {
  const ticketId = prompt('Enter Ticket ID to resolve:');
  if (ticketId) {
    const confirmResolve = confirm(`Are you sure you want to resolve Ticket ${ticketId}?`);
    if (confirmResolve) {
      const ticket = tickets.find((t) => t.id == ticketId);
      if (ticket) {
        ticket.status = 'Resolved';
        showNotification(`Ticket ${ticketId} marked as resolved.`);
        displayTickets();
      } else {
        alert('Ticket not found!');
      }
    }
  }
});

// Function to close tickets (Student Section)
document.getElementById('closeTicket')?.addEventListener('click', function () {
  const ticketId = prompt('Enter Ticket ID to close:');
  if (ticketId) {
    const ticket = tickets.find((t) => t.id == ticketId);
    if (ticket) {
      if (ticket.status === 'Resolved') {
        tickets = tickets.filter((t) => t.id != ticketId);
        showNotification(`Ticket ${ticketId} closed successfully.`);
        displayTickets();
      } else {
        alert('Ticket is not resolved yet!');
      }
    } else {
      alert('Ticket not found!');
    }
  }
});

// Function to add remarks (Warden Section)
document.getElementById('remarkForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const ticketId = document.getElementById('ticketId').value;
  const remark = document.getElementById('remark').value;
  const ticket = tickets.find((t) => t.id == ticketId);
  if (ticket) {
    ticket.remarks.push(remark);
    showNotification(`Remark added to Ticket ${ticketId}.`);
    document.getElementById('remarkForm').reset();
    displayTickets();
  } else {
    alert('Ticket not found!');
  }
});

// Function to show notifications
function showNotification(message, duration = 3000) {
  const notification = document.getElementById('notification');
  if (notification) {
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.display = 'none';
    }, duration);
  }
}

// Display tickets on page load
displayTickets();