export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" id="contact">
      <div className="footer__inner container">
        <div className="footer__brand">
          <span className="navbar__logo-icon">⬡</span>
          <span className="footer__brand-name">
            PC<span className="navbar__logo-accent"> RENTAL</span>
          </span>
          <p className="footer__tagline">ร้านเช่าคอมพิวเตอร์ประสิทธิภาพสูง ทันสมัย พร้อมให้บริการ 24/7</p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4>บริการ</h4>
            <ul>
              <li><a href="#packages">แพ็กเกจเช่า</a></li>
              <li><a href="#features">คุณสมบัติ</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>ติดต่อ</h4>
            <ul>
              <li><a href="#">LINE: @pcrental</a></li>
              <li><a href="#">Facebook: PCRental</a></li>
              <li><a href="#">Tel: 02-XXX-XXXX</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>เวลาทำการ</h4>
            <ul>
              <li>จันทร์ – ศุกร์: 8:00 – 24:00</li>
              <li>เสาร์ – อาทิตย์: 9:00 – 24:00</li>
              <li>วันหยุดนักขัตฤกษ์: 10:00 – 22:00</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {year} PC RENTAL. All rights reserved.</p>
        <p className="footer__powered">Built with React &amp; Three.js</p>
      </div>
    </footer>
  )
}
