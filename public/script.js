function openGame(url) {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    newWindow.opener = null;
}
