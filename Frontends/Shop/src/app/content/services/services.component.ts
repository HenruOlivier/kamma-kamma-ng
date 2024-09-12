import { Component } from '@angular/core';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { ToggleInViewDirective } from '../../shared/directives/toggleInViewClass';
import { TypingEffectDirective } from '../../shared/directives/typingEffect';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TypingEffectDirective, ToggleInViewDirective, ProjectCardComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {

  projects: {heading: string, description: string, bulletPoints: string[]}[] = [
    {
      heading: "Custom Website Development",
      description: "Bring your brand to life with a tailor-made website that reflects your unique identity. From sleek corporate sites to dynamic portfolios, we design and develop websites that are visually stunning, responsive, and user-friendly. Our websites are built to engage your audience and convert visitors into loyal customers.",
      bulletPoints: [
        "Custom design tailored to your brand",
        "Responsive across all devices",
        "SEO optimized to boost visibility",
        "Easy-to-use content management systems",
      ]
    },
    {
      heading: "Web Application Development",
      description: "Empower your business with robust, scalable web applications that streamline operations and enhance user experience. Our team builds secure and high-performance web apps using the latest technologies, ensuring your business stays ahead of the curve. Whether it’s a simple tool or a complex enterprise solution, we’ve got you covered.",
      bulletPoints: [
        "Scalable and secure architecture",
        "Intuitive user interfaces",
        "Real-time data processing",
        "API integration and third-party services"
      ]
    },
    {
      heading: "E-commerce Solutions",
      description: "Transform your online store into a sales powerhouse with our bespoke e-commerce solutions. We create fast, secure, and user-friendly platforms that offer a seamless shopping experience, from browsing to checkout. Our solutions are designed to drive sales, enhance customer satisfaction, and grow your business.",
      bulletPoints: [
        "Customizable storefronts",
        "Secure payment gateway integration",
        "Inventory and order management systems",
        "Mobile-optimized shopping experience"
      ]
    },
    {
      heading: "UX/UI Design",
      description: "Deliver a memorable and intuitive user experience with our expert UX/UI design services. We craft user interfaces that are not only aesthetically pleasing but also highly functional. Our design process focuses on understanding user behavior to create interfaces that are easy to navigate and enjoyable to use.",
      bulletPoints: [
        "User-centered design approach",
        "Wireframing and prototyping",
        "High-fidelity visual designs",
        "Usability testing and iteration"
      ]
    },
    {
      heading: "SEO & Digital Marketing",
      description: "Boost your online visibility and drive targeted traffic to your website with our SEO and digital marketing services. We implement strategies that improve your search engine rankings, increase brand awareness, and convert visitors into customers. Our team stays up-to-date with the latest trends to ensure your business outshines the competition.",
      bulletPoints: [
        "On-page and off-page SEO",
        "Content marketing and copywriting",
        "Social media management",
        "Analytics and performance tracking",
      ]
    },
    {
      heading: "Maintenance & Support",
      description: "Keep your website or web application running smoothly with our ongoing maintenance and support services. We provide regular updates, security checks, and performance optimizations to ensure your digital assets remain secure and up-to-date. Our team is always on hand to assist with any issues, big or small.",
      bulletPoints: [
        "Regular updates and patches",
        "Security monitoring and fixes",
        "Performance optimization",
        "24/7 support and troubleshooting"
      ]
    },
  ];

}
