import React from 'react'
import './footer.css'
import logo from "../../assets/logo.png"
import whats from '../../assets/986960_whatsapp_icon.png'
import face from '../../assets/386622_facebook_icon.png'
import gmail from '../../assets/images.png'
import telegram from '../../assets/tele (1).png'
import insta from '../../assets/insta.png'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
  <div className="footer">
    <div className="container">
        <img src={logo} alt="" />
        <div>
        <span>ــ تعريف بالتطبيق:</span>
        <span>DYP هي مؤسسة تعليمية تُعنى بالتعلم عبر الإنترنت.</span>
        </div>
        <div>
            <span>ــ توصيف عمل التطبيق:</span>
            <span>تتمحور فكرة التطبيق حول تقديم دورات تعليمية للطلاب بكافة المراحل الدراسية، ودورات تنموية تحت أشهر المجالات التعليمية، وتتضمن الدورات شرح تفصيلي مع امثلة عملية عن اي موضوع يتم عرضه في التطبيق، حيث ان الدورات مقسمة حسب المستوى التعليمي وحسب المواضيع المتاحة.
</span>
<Link className='syasa' to="/syasa">سياسة الخصوصية</Link>
        </div>
        <div className="contacts">
            <a href="https://wa.me/+9630956738580"> <img src={whats} alt="" /></a>
            <a href="https://www.facebook.com/profile.php?id=100093128307890&mibextid=ZbWKwL"><img src={face} alt="" /></a>
            <a href="mailto:: www.dyp12@gmail.com"><img src={gmail} alt="" /></a>
            <a href="https://t.me/+EaoTRZcpIxMzY2Jk"><img src={telegram} alt="" /></a>
            <a href="https://instagram.com/dyp_platform?igshid=ZGUzMzM3NWJiOQ=="><img src={insta} alt="" /></a>
        </div>
    </div>
  </div>
  )
}

export default Footer
