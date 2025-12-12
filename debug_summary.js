const getSummary = async (token, siteId) => {
    // Replicate "Today" logic
    const now = new Date();
    now.setHours(0,0,0,0);
    const fromUtc = now.getTime();
    const toUtc = Date.now();
    
    console.log(`Time Range: ${new Date(fromUtc).toISOString()} to ${new Date(toUtc).toISOString()}`);
    const fRes = await fetch(`https://hiring-dev.internal.kloudspot.com/api/analytics/footfall`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId, fromUtc, toUtc })
    });
    const footfall = await fRes.json();
    console.log('F-VAL:', footfall.footfall);

    console.log('Fetch Dwell...');
    const dRes = await fetch(`https://hiring-dev.internal.kloudspot.com/api/analytics/dwell`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId, fromUtc, toUtc })
    });
    const dwell = await dRes.json();
    console.log('DWELL KEYS:', Object.keys(dwell));
    console.log('DWELL VALUES:', Object.values(dwell));
};

const login = async () => {
  const res = await fetch(`https://hiring-dev.internal.kloudspot.com/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@test.com', password: '1234567890' })
  });
  return res.json();
};

(async () => {
    try {
        const auth = await login();
        const token = auth.token;
        const sitesRes = await fetch(`https://hiring-dev.internal.kloudspot.com/api/sites`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(r => r.json());
        
        const sites = Array.isArray(sitesRes) ? sitesRes : (sitesRes.data || []);
        if (sites.length === 0) return console.log('No sites');
        
        const siteId = sites[0].id || sites[0].siteId || sites[0]._id;
        
        await getSummary(token, siteId);

    } catch (e) { console.error(e); }
})();
