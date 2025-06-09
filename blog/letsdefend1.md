# Investigate Web Attack

# 

In this post, I document the investigation of a web attack against a vulnerable application called **bWAPP**, using a simulated `access.log` file. The goal was to identify the attacker's techniques and trace the full kill chain through HTTP log analysis.
# 

## 🔍 Question 1:

**Which automated scan tool did the attacker use for web reconnaissance?**

I started by scanning through the log file and inspecting HTTP headers.

Very quickly, I found a request with a distinctive `User-Agent`:

![Nikto web scanner detection.](/img/letsdefend1/image.png)


This clearly indicated the use of the **Nikto web vulnerability scanner**.


![image.png](/img/letsdefend1/image1.png)

## 🗂️ Question 2:

**After web reconnaissance activity, which technique did the attacker use for directory listing discovery?**

In subsequent entries, Nikto attempted to access numerous files and folders:

![image.png](/img/letsdefend1/image2.png)

This suggested a **directory brute-force enumeration**, where the attacker systematically probes common paths to discover hidden resources.


![image.png](/img/letsdefend1/image3.png)

## 🧪 Question 3:

**What is the third attack type after directory listing discovery?**

To identify the most requested endpoints, I ran:

<div class="code-container">
  <button class="copy-btn" onclick="copyToClipboard(this)"> Copy</button>
  <pre class="codeblock"><code>awk '{print $7}' access.log | sort | uniq -c | sort -nr | head -20</code></pre>
</div>

![image.png](/img/letsdefend1/image4.png)

![image.png](/img/letsdefend1/image5.png)

This revealed over **135 requests to `/login.php`**, indicating a **brute-force attack** against the login form.


![image.png](/img/letsdefend1/image6.png)

## 🔐 Question 4:

**Is the third attack successful?**

By reviewing HTTP status codes, I observed a pattern:


<div class="code-container">
  <button class="copy-btn" onclick="copyToClipboard(this)"> Copy</button>
  <pre class="codeblock"><code>POST /login.php → 200 (initially)  
→ then: 302 redirect to /portal.php</code></pre>
</div>




This 302 redirect implies a successful login — the attacker was granted access to the dashboard.


![image.png](/img/letsdefend1/image7.png)

## 💉 Question 5:

**What is the name of the fourth attack?**

Shortly after login, the attacker accessed:

![image.png](/img/letsdefend1/image8.png)

Then passed input to the `message` parameter that executed system commands. This was a classic case of **Command Injection**.


![image.png](/img/letsdefend1/image9.png)

## 🧠 Question 6:

**What is the first payload for the fourth attack?**

Before executing real commands, the attacker tested the input with `message=test`. Then came the first actual payload:

<div class="code-container">
  <button class="copy-btn" onclick="copyToClipboard(this)"> Copy</button>
  <pre class="codeblock"><code>GET /bWAPP/phpi.php?message=""; system('whoami')</code></pre>
</div>

This command prints the current system user — confirming code execution on the host.


![image.png](/img/letsdefend1/image10.png)

## 🔁 Question 7:

**Is there any persistence clue for the victim machine in the log file? If yes, what is the related payload?**

Yes — the attacker tried to **add a new local user**, which is a common persistence technique:

![image.png](/img/letsdefend1/image11.png)

<div class="code-container">
  <button class="copy-btn" onclick="copyToClipboard(this)"> Copy</button>
  <pre class="codeblock"><code>GET /bWAPP/phpi.php?message=""; system('net user hacker Asd123!! /add')</code></pre>
</div>


![image.png](/img/letsdefend1/image12.png)

### ✅ Summary  
#### 🛠️ Web-based Kill Chain

| **Stage**         | **Technique**             |
|-------------------|---------------------------|
| Reconnaissance    | Nikto scanner             |
| Discovery         | Directory brute force     |
| Access            | Brute-force login         |
| Exploitation      | Command injection (RCE)   |
| Persistence       | System user creation      |


This type of hands-on log analysis is critical for anyone working in SOC or DFIR roles.

It builds intuition for attacker behavior, strengthens detection skills, and improves incident response capabilities.

If you enjoyed this write-up, connect with me on LinkedIn