-- Promo Codes Table
CREATE TABLE IF NOT EXISTS promo_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255),
    discount_type ENUM('free_entry', 'percentage', 'fixed_amount') DEFAULT 'free_entry',
    discount_value DECIMAL(10,2) DEFAULT 0.00,
    max_uses INT DEFAULT 1,
    used_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    valid_from DATETIME DEFAULT CURRENT_TIMESTAMP,
    valid_until DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by_admin INT,
    FOREIGN KEY (created_by_admin) REFERENCES admin_users(id)
);

-- Promo Code Usage Table
CREATE TABLE IF NOT EXISTS promo_code_usage (
    id INT AUTO_INCREMENT PRIMARY KEY,
    promo_code_id INT NOT NULL,
    entry_id INT NOT NULL,
    used_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_email VARCHAR(255),
    FOREIGN KEY (promo_code_id) REFERENCES promo_codes(id),
    FOREIGN KEY (entry_id) REFERENCES entries(id)
);

-- Insert some sample promo codes
INSERT INTO promo_codes (code, description, discount_type, max_uses, valid_until) VALUES
('FREETRIAL', 'Free entry for trial period', 'free_entry', 10, DATE_ADD(NOW(), INTERVAL 30 DAY)),
('EARLYBIRD', 'Early bird discount - 50% off', 'percentage', 50, DATE_ADD(NOW(), INTERVAL 7 DAY)),
('VIP2024', 'VIP free entry', 'free_entry', 5, DATE_ADD(NOW(), INTERVAL 60 DAY));









