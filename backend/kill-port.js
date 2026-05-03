import { execSync } from 'child_process';

const port = 8080;

try {
    const stdout = execSync(`netstat -ano | findstr :${port}`).toString();
    const lines = stdout.trim().split('\n');
    const pids = new Set();
    
    lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && pid !== '0') {
            pids.add(pid);
        }
    });

    pids.forEach(pid => {
        try {
            console.log(`Killing process ${pid} on port ${port}...`);
            execSync(`taskkill /F /PID ${pid}`);
        } catch (e) {
            // Ignore errors if process already exited
        }
    });
} catch (e) {
    // No process found on port, ignore
}
