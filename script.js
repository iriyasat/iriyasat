// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');

// Auto-hide navbar on scroll
let lastScrollTop = 0;
let scrollThreshold = 5;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for styling
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show navbar based on scroll direction
    if (Math.abs(scrollTop - lastScrollTop) < scrollThreshold) {
        return;
    }
    
    if (scrollTop > lastScrollTop && scrollTop > 80) {
        // Scrolling down & past threshold
        header.classList.add('nav-hidden');
        console.log('Navbar hidden'); // Debug log
    } else if (scrollTop < lastScrollTop) {
        // Scrolling up
        header.classList.remove('nav-hidden');
        console.log('Navbar shown'); // Debug log
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Save Contact Functionality
const saveContactBtn = document.getElementById('saveContact');

saveContactBtn.addEventListener('click', () => {
    const contactInfo = {
        name: 'Ibrahim Hasan',
        address: '385/7, Free School Street, Hatirpool, Kalabagan, Dhaka – 1205',
        phone: '+8801677932666',
        email: 'ihriyasat@gmail.com',
        linkedin: 'https://www.linkedin.com/in/ihriyasat/',
        github: 'https://github.com/iriyasat',
        facebook: 'https://www.facebook.com/ihriyasat',
        twitter: 'https://x.com/IHRiyasat'
    };

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        const contactString = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
TEL;TYPE=CELL:${contactInfo.phone}
EMAIL:${contactInfo.email}
ADR;TYPE=WORK:${contactInfo.address}
URL:${contactInfo.linkedin}
URL:${contactInfo.github}
URL:${contactInfo.facebook}
URL:${contactInfo.twitter}
END:VCARD`;

        const link = document.createElement('a');
        link.href = `data:text/vcard;charset=utf-8,${encodeURIComponent(contactString)}`;
        link.setAttribute('download', 'Ibrahim_Hasan.vcf');
        link.setAttribute('type', 'text/vcard');
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
TEL;TYPE=CELL:${contactInfo.phone}
EMAIL:${contactInfo.email}
ADR;TYPE=WORK:${contactInfo.address}
URL:${contactInfo.linkedin}
URL:${contactInfo.github}
URL:${contactInfo.facebook}
URL:${contactInfo.twitter}
END:VCARD`;

        const blob = new Blob([vCard], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Ibrahim_Hasan.vcf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    saveContactBtn.classList.add('copied');
    saveContactBtn.innerHTML = '<i class="fas fa-check"></i> Contact Saved';
    
    setTimeout(() => {
        saveContactBtn.classList.remove('copied');
        saveContactBtn.innerHTML = '<i class="fas fa-address-card"></i> Save Contact';
    }, 2000);
});