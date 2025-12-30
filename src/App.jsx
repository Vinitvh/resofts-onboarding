import { useState } from "react";

export default function App() {
  const INDIAN_STATES = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const ENTITY_TYPES = [
    { value: "pvt_ltd", label: "Private Limited Company" },
    { value: "llp", label: "Limited Liability Partnership" },
    { value: "partnership", label: "Partnership Firm" },
    { value: "proprietorship", label: "Sole Proprietorship" },
    { value: "public_ltd", label: "Public Limited Company" },
  ];

  const ROLES = [
    { id: "developer", label: "Solar Developer", icon: "☀️" },
    { id: "epc", label: "EPC Contractor", icon: "🔧" },
    { id: "bos", label: "Balance Of Systems", icon: "🏠" },
    { id: "ic", label: "Installation & Commisioning", icon: "🔧" },
    { id: "supplier", label: "Supplier / Trader", icon: "📊" },
    { id: "om", label: "O&M Provider", icon: "⚙️" },
  ];

  const FOCUS_AREAS = [
    { id: "utility", label: "Utility Scale", desc: "> 5 MW ground-mount" },
    {
      id: "ci",
      label: "C&I (Open Access / Captive)",
      desc: "100 kW - 5 MW",
    },
    { id: "rooftop_res", label: "Rooftop - Residential", desc: "< 10 kW" },
    {
      id: "rooftop_com",
      label: "Rooftop - Commercial",
      desc: "10 - 100 kW",
    },
  ];

  const TECHNOLOGIES = [
    "Mono PERC",
    "TOPCon",
    "Bifacial",
    "HJT",
    "Fixed Tilt",
    "Single-Axis Tracker",
    "Dual-Axis Tracker",
  ];

  const GRID_LEVELS = [
    "11 kV",
    "33 kV",
    "66 kV",
    "132 kV",
    "220 kV",
    "Pooling Substation",
  ];

  const TENDER_AUTHORITIES = [
    {
      id: "ipp",
      label: "Private IPPs",
      full: "Independent Power Producers",
    },
  ];

  const BANKS = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Yes Bank",
    "IndusInd Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
    "Union Bank of India",
  ];

  const mockCompanyData = {
    AABCT1234C: {
      name: "Tata Power Solar Systems Limited",
      address: "62, Electronics City, Phase 1, Hosur Road, Bengaluru - 560100",
      status: "Active",
      type: "pvt_ltd",
    },
    AAGCR5678D: {
      name: "ReNew Power Private Limited",
      address: "Building 9B, DLF Cyber City, Phase III, Gurugram - 122002",
      status: "Active",
      type: "pvt_ltd",
    },
  };

  // ============================================
  // STAGE COMPONENTS
  // ============================================

  const Stage1AccountCreation = ({ data, onUpdate, onComplete }) => {
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [verifying, setVerifying] = useState(false);

    const sendOtp = () => {
      if (data.mobile?.length === 10) {
        setOtpSent(true);
      }
    };

    const verifyAndComplete = () => {
      if (otp.length === 6) {
        setVerifying(true);
        setTimeout(() => {
          setVerifying(false);
          onComplete();
        }, 1500);
      }
    };

    const isValid =
      data.email &&
      data.mobile?.length === 10 &&
      data.companyName &&
      otp.length === 6;

    return (
      <div className="stage-content">
        <div className="stage-header">
          <span className="stage-badge">30 seconds</span>
          <h2>Let's get started</h2>
          <p className="stage-subtitle">
            Create your account to explore live tenders
          </p>
        </div>

        <div className="form-group">
          <label>Work Email</label>
          <input
            type="email"
            placeholder="you@company.com"
            value={data.email || ""}
            onChange={(e) => onUpdate({ email: e.target.value })}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <div className="input-with-action">
            <div className="phone-input">
              <span className="country-code">+91</span>
              <input
                type="tel"
                placeholder="9876543210"
                maxLength={10}
                value={data.mobile || ""}
                onChange={(e) =>
                  onUpdate({ mobile: e.target.value.replace(/\D/g, "") })
                }
                className="input-field"
              />
            </div>
            {!otpSent && (
              <button
                className="btn-secondary"
                onClick={sendOtp}
                disabled={data.mobile?.length !== 10}
              >
                Send OTP
              </button>
            )}
          </div>

          {otpSent && (
            <div className="otp-section">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="input-field otp-input"
              />
              <span className="otp-hint">OTP sent to +91 {data.mobile}</span>
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            placeholder="Your company or trading name"
            value={data.companyName || ""}
            onChange={(e) => onUpdate({ companyName: e.target.value })}
            className="input-field"
          />
        </div>

        <button
          className="btn-primary"
          onClick={verifyAndComplete}
          disabled={!isValid || verifying}
        >
          {verifying ? (
            <span className="loading-text">Verifying...</span>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="unlock-preview">
          <span className="unlock-icon">🔓</span>
          <span>This unlocks: Browse live tenders (read-only)</span>
        </div>
      </div>
    );
  };

  const Stage2LegalSnapshot = ({ data, onUpdate, onComplete }) => {
    const [fetching, setFetching] = useState(false);
    const [fetched, setFetched] = useState(false);

    const fetchCompanyDetails = () => {
      setFetching(true);
      setTimeout(() => {
        const mockData = mockCompanyData[data.pan] || {
          name: data.companyName || "Sample Solar Pvt Ltd",
          address: "123 Industrial Area, Phase 2, Gurugram - 122001",
          status: "Active",
          type: data.entityType || "pvt_ltd",
        };
        onUpdate({
          legalName: mockData.name,
          registeredAddress: mockData.address,
          companyStatus: mockData.status,
          entityType: mockData.type,
        });
        setFetching(false);
        setFetched(true);
      }, 2000);
    };

    const needsCIN = ["pvt_ltd", "public_ltd", "llp"].includes(data.entityType);
    const isValid =
      data.pan?.length === 10 &&
      data.entityType &&
      data.registeredState &&
      (!needsCIN || data.cin?.length >= 10) &&
      data.gstin;

    return (
      <div className="stage-content">
        <div className="stage-header">
          <span className="stage-badge">2 minutes</span>
          <h2>Legal Identity</h2>
          <p className="stage-subtitle">We'll auto-fetch your details</p>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Entity Type</label>
            <select
              value={data.entityType || ""}
              onChange={(e) => onUpdate({ entityType: e.target.value })}
              className="input-field"
            >
              <option value="">Select type...</option>
              {ENTITY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Registered State</label>
            <select
              value={data.registeredState || ""}
              onChange={(e) => onUpdate({ registeredState: e.target.value })}
              className="input-field"
            >
              <option value="">Select state...</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>PAN</label>
            <input
              type="text"
              placeholder="AABCT1234C"
              maxLength={10}
              value={data.pan || ""}
              onChange={(e) => onUpdate({ pan: e.target.value.toUpperCase() })}
              className="input-field mono"
            />
          </div>

          {needsCIN && (
            <div className="form-group">
              <label>{data.entityType === "llp" ? "LLPIN" : "CIN"}</label>
              <input
                type="text"
                placeholder={
                  data.entityType === "llp"
                    ? "AAA-0000"
                    : "U12345MH2020PTC123456"
                }
                value={data.cin || ""}
                onChange={(e) =>
                  onUpdate({ cin: e.target.value.toUpperCase() })
                }
                className="input-field mono"
              />
            </div>
          )}
        </div>

        {!fetched && (
          <button
            className="btn-secondary fetch-btn"
            onClick={fetchCompanyDetails}
            disabled={!data.pan || data.pan.length !== 10 || fetching}
          >
            {fetching ? (
              <>
                <span className="spinner"></span>
                Fetching from MCA...
              </>
            ) : (
              <>
                <span className="fetch-icon">⚡</span>
                Auto-Fetch Company Details
              </>
            )}
          </button>
        )}

        {fetched && data.legalName && (
          <div className="fetched-data">
            <div className="fetched-header">
              <span className="success-icon">✓</span>
              <span>Details fetched successfully</span>
            </div>
            <div className="fetched-content">
              <div className="fetched-item">
                <label>Legal Name</label>
                <span>{data.legalName}</span>
              </div>
              <div className="fetched-item">
                <label>Registered Address</label>
                <span>{data.registeredAddress}</span>
              </div>
              <div className="fetched-item status-active">
                <label>Status</label>
                <span className="status-badge">{data.companyStatus}</span>
              </div>
            </div>
          </div>
        )}

        <div className="form-group">
          <label>GSTIN</label>
          <input
            type="text"
            placeholder="22AABCT1234C1Z5"
            value={data.gstin}
            onChange={(e) => onUpdate({ gstin: e.target.value.toUpperCase() })}
            className="input-field mono"
          />
        </div>

        <button
          className="btn-primary"
          onClick={onComplete}
          disabled={!isValid}
        >
          Continue
        </button>

        <div className="unlock-preview">
          <span className="unlock-icon">🔓</span>
          <span>This unlocks: Save tenders • Receive tender alerts</span>
        </div>
      </div>
    );
  };

  const Stage3BusinessProfile = ({ data, onUpdate, onComplete }) => {
    const toggleRole = (roleId) => {
      const roles = data.roles || [];
      const updated = roles.includes(roleId)
        ? roles.filter((r) => r !== roleId)
        : [...roles, roleId];
      onUpdate({ roles: updated });
    };

    const toggleFocus = (focusId) => {
      const focus = data.focusAreas || [];
      const updated = focus.includes(focusId)
        ? focus.filter((f) => f !== focusId)
        : [...focus, focusId];
      onUpdate({ focusAreas: updated });
    };

    const toggleState = (state) => {
      const states = data.statesOperated || [];
      const updated = states.includes(state)
        ? states.filter((s) => s !== state)
        : [...states, state];
      onUpdate({ statesOperated: updated });
    };

    const toggleTech = (tech) => {
      const techs = data.technologies || [];
      const updated = techs.includes(tech)
        ? techs.filter((t) => t !== tech)
        : [...techs, tech];
      onUpdate({ technologies: updated });
    };

    const toggleGrid = (level) => {
      const grids = data.gridLevels || [];
      const updated = grids.includes(level)
        ? grids.filter((g) => g !== level)
        : [...grids, level];
      onUpdate({ gridLevels: updated });
    };

    const isValid = data.roles?.length > 0 && data.focusAreas?.length > 0;

    return (
      <div className="stage-content wide">
        <div className="stage-header">
          <span className="stage-badge">5-8 minutes</span>
          <h2>Your Business Profile</h2>
          <p className="stage-subtitle">
            Tell us about your capabilities — no documents needed yet
          </p>
        </div>

        <div className="section-block">
          <h3>What do you do?</h3>
          <p className="section-hint">Select all that apply</p>
          <div className="role-grid">
            {ROLES.map((role) => (
              <button
                key={role.id}
                className={`role-card ${
                  (data.roles || []).includes(role.id) ? "selected" : ""
                }`}
                onClick={() => toggleRole(role.id)}
              >
                <span className="role-icon">{role.icon}</span>
                <span className="role-label">{role.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="section-block">
          <h3>Primary Focus</h3>
          <div className="focus-grid">
            {FOCUS_AREAS.map((focus) => (
              <button
                key={focus.id}
                className={`focus-card ${
                  (data.focusAreas || []).includes(focus.id) ? "selected" : ""
                }`}
                onClick={() => toggleFocus(focus.id)}
              >
                <span className="focus-label">{focus.label}</span>
                <span className="focus-desc">{focus.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="section-block">
          <h3>Execution Experience</h3>

          <div className="slider-group">
            <label>
              Total Installed Capacity
              <span className="slider-value">
                {data.installedCapacity || 0} MW
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={data.installedCapacity || 0}
              onChange={(e) =>
                onUpdate({ installedCapacity: parseInt(e.target.value) })
              }
              className="range-slider"
            />
            <div className="slider-labels">
              <span>0 MW</span>
              <span>250 MW</span>
              <span>500 MW</span>
              <span>750 MW</span>
              <span>1000+ MW</span>
            </div>
          </div>

          <div className="slider-group">
            <label>
              Largest Single Project
              <span className="slider-value">
                {data.largestProject || 0} MW
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="500"
              step="5"
              value={data.largestProject || 0}
              onChange={(e) =>
                onUpdate({ largestProject: parseInt(e.target.value) })
              }
              className="range-slider"
            />
            <div className="slider-labels">
              <span>0 MW</span>
              <span>125 MW</span>
              <span>250 MW</span>
              <span>375 MW</span>
              <span>500+ MW</span>
            </div>
          </div>

          <div className="slider-group">
            <label>
              Projects Commissioned
              <span className="slider-value">
                {data.projectsCount || 0} projects
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={data.projectsCount || 0}
              onChange={(e) =>
                onUpdate({ projectsCount: parseInt(e.target.value) })
              }
              className="range-slider"
            />
          </div>
        </div>

        <div className="section-block">
          <h3>States of Operation</h3>
          <p className="section-hint">
            Click to select states where you have executed projects
          </p>
          <div className="states-grid">
            {INDIAN_STATES.map((state) => (
              <button
                key={state}
                className={`state-chip ${
                  (data.statesOperated || []).includes(state) ? "selected" : ""
                }`}
                onClick={() => toggleState(state)}
              >
                {state}
              </button>
            ))}
          </div>
          {data.statesOperated?.length > 0 && (
            <div className="selection-count">
              {data.statesOperated.length} states selected
            </div>
          )}
        </div>

        <div className="section-block">
          <h3>Technology Experience</h3>
          <div className="tech-grid">
            {TECHNOLOGIES.map((tech) => (
              <button
                key={tech}
                className={`tech-chip ${
                  (data.technologies || []).includes(tech) ? "selected" : ""
                }`}
                onClick={() => toggleTech(tech)}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        <div className="section-block">
          <h3>Grid Connectivity Experience</h3>
          <div className="grid-levels">
            {GRID_LEVELS.map((level) => (
              <button
                key={level}
                className={`grid-chip ${
                  (data.gridLevels || []).includes(level) ? "selected" : ""
                }`}
                onClick={() => toggleGrid(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <button
          className="btn-primary"
          onClick={onComplete}
          disabled={!isValid}
        >
          Continue
        </button>

        <div className="unlock-preview highlight">
          <span className="unlock-icon">🎯</span>
          <span>This unlocks: Eligibility preview for all active tenders</span>
        </div>
      </div>
    );
  };

  const Stage4TenderProfile = ({ data, onUpdate, onComplete }) => {
    const toggleAuthority = (authId) => {
      const auths = data.preferredAuthorities || [];
      const updated = auths.includes(authId)
        ? auths.filter((a) => a !== authId)
        : [...auths, authId];
      onUpdate({ preferredAuthorities: updated });
    };

    const calculateFitScore = () => {
      let score = 0;
      if (data.installedCapacity > 100) score += 25;
      if (data.preferredAuthorities?.length > 2) score += 20;
      if (data.bidRole) score += 15;
      if (data.reverseAuctionExp) score += 10;
      if (data.tenderSizeMin) score += 15;
      if (data.ePortalExp) score += 15;
      return Math.min(score, 100);
    };

    const fitScore = calculateFitScore();

    return (
      <div className="stage-content">
        <div className="stage-header">
          <span className="stage-badge">3 minutes</span>
          <h2>Tender Preferences</h2>
          <p className="stage-subtitle">
            Help us match you with the right opportunities
          </p>
        </div>

        <div className="section-block">
          <h3>Typical Tender Size You Bid</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Minimum (MW)</label>
              <input
                type="number"
                placeholder="e.g., 10"
                value={data.tenderSizeMin || ""}
                onChange={(e) => onUpdate({ tenderSizeMin: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Maximum (MW)</label>
              <input
                type="number"
                placeholder="e.g., 250"
                value={data.tenderSizeMax || ""}
                onChange={(e) => onUpdate({ tenderSizeMax: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        <div className="section-block">
          <h3>Preferred Tender Authorities</h3>
          <div className="authority-grid">
            {TENDER_AUTHORITIES.map((auth) => (
              <button
                key={auth.id}
                className={`authority-card ${
                  (data.preferredAuthorities || []).includes(auth.id)
                    ? "selected"
                    : ""
                }`}
                onClick={() => toggleAuthority(auth.id)}
              >
                <span className="auth-label">{auth.label}</span>
                <span className="auth-full">{auth.full}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="section-block">
          <h3>How Do You Typically Participate?</h3>
          <div className="bid-role-options">
            {[
              {
                id: "sole",
                label: "Sole Bidder",
                desc: "Independent bids",
              },
              {
                id: "consortium",
                label: "Consortium Member",
                desc: "Joint ventures",
              },
              {
                id: "epc_for",
                label: "EPC for Developer",
                desc: "Subcontractor role",
              },
            ].map((role) => (
              <button
                key={role.id}
                className={`bid-role-card ${
                  data.bidRole === role.id ? "selected" : ""
                }`}
                onClick={() => onUpdate({ bidRole: role.id })}
              >
                <span className="role-label">{role.label}</span>
                <span className="role-desc">{role.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="section-block">
          <h3>Platform Experience</h3>
          <div className="exp-questions">
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={data.reverseAuctionExp || false}
                onChange={(e) =>
                  onUpdate({ reverseAuctionExp: e.target.checked })
                }
              />
              <span className="checkbox-label">
                Experience with reverse auctions
              </span>
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={data.ePortalExp || false}
                onChange={(e) => onUpdate({ ePortalExp: e.target.checked })}
              />
              <span className="checkbox-label">
                Experience with e-bidding portals (GeM / eProc)
              </span>
            </label>
          </div>
        </div>

        <div className="fit-preview">
          <div className="fit-header">
            <h4>Your Tender Fit Score</h4>
            <span className="fit-score">{fitScore}%</span>
          </div>
          <div className="fit-bar">
            <div className="fit-fill" style={{ width: `${fitScore}%` }}></div>
          </div>
          <div className="fit-insights">
            {data.installedCapacity < 100 && (
              <div className="insight warning">
                <span className="insight-icon">⚠️</span>
                <span>
                  You may not qualify for tenders requiring 100+ MW experience
                </span>
              </div>
            )}
            {data.preferredAuthorities?.includes("seci") && (
              <div className="insight success">
                <span className="insight-icon">✓</span>
                <span>Strong match for SECI utility-scale tenders</span>
              </div>
            )}
            {data.bidRole === "epc_for" && (
              <div className="insight info">
                <span className="insight-icon">ℹ️</span>
                <span>We'll prioritize showing you developer RFQs</span>
              </div>
            )}
          </div>
        </div>

        <button className="btn-primary" onClick={onComplete}>
          Continue
        </button>

        <div className="unlock-preview highlight">
          <span className="unlock-icon">🔓</span>
          <span>
            This unlocks: Bid eligibility checks • Smart tender recommendations
          </span>
        </div>
      </div>
    );
  };

  const Stage5FinancialReadiness = ({ data, onUpdate, onComplete }) => {
    return (
      <div className="stage-content">
        <div className="stage-header">
          <span className="stage-badge">3 minutes</span>
          <h2>Financial Readiness</h2>
          <p className="stage-subtitle">
            Self-declared information — documents come later
          </p>
        </div>

        <div className="section-block">
          <h3>Annual Turnover (₹ Crores)</h3>
          <div className="turnover-grid">
            <div className="form-group">
              <label>FY 2024-25</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  placeholder="0"
                  value={data.turnoverFY24 || ""}
                  onChange={(e) => onUpdate({ turnoverFY24: e.target.value })}
                  className="input-field"
                />
                <span className="unit">Cr</span>
              </div>
            </div>
            <div className="form-group">
              <label>FY 2023-24</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  placeholder="0"
                  value={data.turnoverFY23 || ""}
                  onChange={(e) => onUpdate({ turnoverFY23: e.target.value })}
                  className="input-field"
                />
                <span className="unit">Cr</span>
              </div>
            </div>
            <div className="form-group">
              <label>FY 2022-23</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  placeholder="0"
                  value={data.turnoverFY22 || ""}
                  onChange={(e) => onUpdate({ turnoverFY22: e.target.value })}
                  className="input-field"
                />
                <span className="unit">Cr</span>
              </div>
            </div>
          </div>
        </div>

        <div className="section-block">
          <div className="form-group">
            <label>Net Worth (Latest Audited) — ₹ Crores</label>
            <div className="input-with-unit">
              <input
                type="number"
                placeholder="0"
                value={data.netWorth || ""}
                onChange={(e) => onUpdate({ netWorth: e.target.value })}
                className="input-field"
              />
              <span className="unit">Cr</span>
            </div>
          </div>
        </div>

        <div className="section-block">
          <h3>Primary Bank</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Bank Name</label>
              <select
                value={data.bankName || ""}
                onChange={(e) => onUpdate({ bankName: e.target.value })}
                className="input-field"
              >
                <option value="">Select bank...</option>
                {BANKS.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>IFSC Code</label>
              <input
                type="text"
                placeholder="SBIN0001234"
                value={data.ifsc || ""}
                onChange={(e) =>
                  onUpdate({ ifsc: e.target.value.toUpperCase() })
                }
                className="input-field mono"
              />
            </div>
          </div>
        </div>

        <div className="section-block">
          <h3>Bank Guarantee / EMD Capability</h3>
          <div className="capability-options">
            <label className="radio-card">
              <input
                type="radio"
                name="bgCapability"
                checked={data.bgCapability === "yes"}
                onChange={() => onUpdate({ bgCapability: "yes" })}
              />
              <div className="radio-content">
                <span className="radio-label">Yes, we can furnish BGs</span>
                <span className="radio-desc">
                  Have existing credit lines with banks
                </span>
              </div>
            </label>
            <label className="radio-card">
              <input
                type="radio"
                name="bgCapability"
                checked={data.bgCapability === "limited"}
                onChange={() => onUpdate({ bgCapability: "limited" })}
              />
              <div className="radio-content">
                <span className="radio-label">Limited capacity</span>
                <span className="radio-desc">
                  Can furnish for smaller amounts
                </span>
              </div>
            </label>
            <label className="radio-card">
              <input
                type="radio"
                name="bgCapability"
                checked={data.bgCapability === "no"}
                onChange={() => onUpdate({ bgCapability: "no" })}
              />
              <div className="radio-content">
                <span className="radio-label">Not currently</span>
                <span className="radio-desc">May need escrow alternatives</span>
              </div>
            </label>
          </div>
        </div>

        <div className="attestation-box">
          <label className="checkbox-item">
            <input
              type="checkbox"
              checked={data.financialAttestation || false}
              onChange={(e) =>
                onUpdate({ financialAttestation: e.target.checked })
              }
            />
            <span className="checkbox-label">
              I confirm the above information is accurate to the best of my
              knowledge
            </span>
          </label>
        </div>

        <button
          className="btn-primary"
          onClick={onComplete}
          disabled={!data.financialAttestation}
        >
          Continue
        </button>

        <div className="unlock-preview">
          <span className="unlock-icon">🔓</span>
          <span>
            This unlocks: Express interest in tenders • Shortlist participation
          </span>
        </div>
      </div>
    );
  };

  const Stage6EscrowSetup = ({ data, onUpdate, onComplete }) => {
    const toggleTransactionType = (type) => {
      const types = data.transactionTypes || [];
      const updated = types.includes(type)
        ? types.filter((t) => t !== type)
        : [...types, type];
      onUpdate({ transactionTypes: updated });
    };

    return (
      <div className="stage-content">
        <div className="stage-header">
          <span className="stage-badge">2 minutes</span>
          <h2>Transaction Setup</h2>
          <p className="stage-subtitle">
            Configure escrow to protect both parties and speed up payments
          </p>
        </div>

        <div className="escrow-value-prop">
          <div className="value-icon">🛡️</div>
          <div className="value-content">
            <h4>Why Escrow?</h4>
            <p>
              Funds are held securely and released only when milestones are
              verified. This protects developers from delayed payments and EPCs
              from scope creep.
            </p>
          </div>
        </div>

        <div className="section-block">
          <h3>Authorized Payment Signatory</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="As per authorization"
                value={data.signatoryName || ""}
                onChange={(e) => onUpdate({ signatoryName: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Designation</label>
              <input
                type="text"
                placeholder="e.g., CFO, Director"
                value={data.signatoryDesignation || ""}
                onChange={(e) =>
                  onUpdate({ signatoryDesignation: e.target.value })
                }
                className="input-field"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="signatory@company.com"
                value={data.signatoryEmail || ""}
                onChange={(e) => onUpdate({ signatoryEmail: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Mobile</label>
              <div className="phone-input">
                <span className="country-code">+91</span>
                <input
                  type="tel"
                  placeholder="9876543210"
                  maxLength={10}
                  value={data.signatoryMobile || ""}
                  onChange={(e) =>
                    onUpdate({
                      signatoryMobile: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="section-block">
          <h3>Expected Transaction Types</h3>
          <div className="transaction-types">
            {[
              {
                id: "emd",
                label: "EMD Deposits",
                desc: "Earnest Money for bids",
              },
              {
                id: "bg_milestone",
                label: "BG-Linked Milestones",
                desc: "Performance guarantee releases",
              },
              {
                id: "epc_milestone",
                label: "EPC Milestone Payments",
                desc: "Progress-based payments",
              },
              {
                id: "advance",
                label: "Advance Payments",
                desc: "Mobilization advances",
              },
            ].map((type) => (
              <button
                key={type.id}
                className={`transaction-card ${
                  (data.transactionTypes || []).includes(type.id)
                    ? "selected"
                    : ""
                }`}
                onClick={() => toggleTransactionType(type.id)}
              >
                <span className="tx-label">{type.label}</span>
                <span className="tx-desc">{type.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="escrow-acceptance">
          <label className="checkbox-item large">
            <input
              type="checkbox"
              checked={data.escrowAcceptance || false}
              onChange={(e) => onUpdate({ escrowAcceptance: e.target.checked })}
            />
            <div className="checkbox-content">
              <span className="checkbox-label">
                I agree to use escrow for platform transactions
              </span>
              <span className="checkbox-desc">
                Transaction fees apply. Terms available in our escrow policy.
              </span>
            </div>
          </label>
        </div>

        <button
          className="btn-primary"
          onClick={onComplete}
          disabled={!data.escrowAcceptance || !data.signatoryName}
        >
          Continue
        </button>

        <div className="unlock-preview highlight">
          <span className="unlock-icon">💰</span>
          <span>This unlocks: Financial participation • Deal execution</span>
        </div>
      </div>
    );
  };

  const Stage7DocumentVerification = ({ data, onUpdate, onComplete }) => {
    const [uploading, setUploading] = useState({});

    const simulateUpload = (docType) => {
      setUploading((prev) => ({ ...prev, [docType]: true }));
      setTimeout(() => {
        setUploading((prev) => ({ ...prev, [docType]: false }));
        onUpdate({ [`${docType}Uploaded`]: true });
      }, 2000);
    };

    return (
      <div className="stage-content">
        <div className="stage-header">
          <span className="stage-badge">Optional</span>
          <h2>Verification Documents</h2>
          <p className="stage-subtitle">
            Upload documents to earn trust badges and improve bid visibility
          </p>
        </div>

        <div className="badges-preview">
          <h4>Badges You Can Earn</h4>
          <div className="badges-grid">
            <div
              className={`badge-item ${
                data.completionCertUploaded ? "earned" : ""
              }`}
            >
              <span className="badge-icon">✓</span>
              <span className="badge-label">Verified Developer</span>
            </div>
            <div
              className={`badge-item ${
                data.financialsUploaded ? "earned" : ""
              }`}
            >
              <span className="badge-icon">✓</span>
              <span className="badge-label">Financially Verified</span>
            </div>
            <div
              className={`badge-item ${
                data.netWorthCertUploaded ? "earned" : ""
              }`}
            >
              <span className="badge-icon">✓</span>
              <span className="badge-label">Net Worth Certified</span>
            </div>
          </div>
        </div>

        <div className="document-uploads">
          <div
            className={`upload-card ${
              data.completionCertUploaded ? "uploaded" : ""
            }`}
          >
            <div className="upload-info">
              <h4>Completion Certificates / LOAs</h4>
              <p>Project completion proofs from clients or authorities</p>
            </div>
            {data.completionCertUploaded ? (
              <span className="upload-success">✓ Uploaded</span>
            ) : (
              <button
                className="btn-upload"
                onClick={() => simulateUpload("completionCert")}
                disabled={uploading.completionCert}
              >
                {uploading.completionCert ? "Uploading..." : "Upload PDF"}
              </button>
            )}
          </div>

          <div
            className={`upload-card ${
              data.financialsUploaded ? "uploaded" : ""
            }`}
          >
            <div className="upload-info">
              <h4>Audited Financial Statements</h4>
              <p>Last 3 years of audited P&L and Balance Sheet</p>
            </div>
            {data.financialsUploaded ? (
              <span className="upload-success">✓ Uploaded</span>
            ) : (
              <button
                className="btn-upload"
                onClick={() => simulateUpload("financials")}
                disabled={uploading.financials}
              >
                {uploading.financials ? "Uploading..." : "Upload PDF"}
              </button>
            )}
          </div>

          <div
            className={`upload-card ${
              data.netWorthCertUploaded ? "uploaded" : ""
            }`}
          >
            <div className="upload-info">
              <h4>Net Worth Certificate</h4>
              <p>CA-certified net worth statement</p>
            </div>
            {data.netWorthCertUploaded ? (
              <span className="upload-success">✓ Uploaded</span>
            ) : (
              <button
                className="btn-upload"
                onClick={() => simulateUpload("netWorthCert")}
                disabled={uploading.netWorthCert}
              >
                {uploading.netWorthCert ? "Uploading..." : "Upload PDF"}
              </button>
            )}
          </div>
        </div>

        <div className="skip-option">
          <p>You can always upload documents later from your profile</p>
        </div>

        <button className="btn-primary" onClick={onComplete}>
          Complete Onboarding
        </button>
      </div>
    );
  };

  const CompletionScreen = ({ data }) => {
    const badgesEarned = [
      data.completionCertUploaded && "Verified Developer",
      data.financialsUploaded && "Financially Verified",
      data.netWorthCertUploaded && "Net Worth Certified",
    ].filter(Boolean);

    return (
      <div className="completion-screen">
        <div className="completion-icon">🎉</div>
        <h2>Welcome Aboard!</h2>
        <p className="completion-company">
          {data.legalName || data.companyName}
        </p>

        <div className="completion-summary">
          <div className="summary-item">
            <span className="summary-label">Profile Completion</span>
            <span className="summary-value">100%</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Tender Fit Score</span>
            <span className="summary-value">78%</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Active Tender Matches</span>
            <span className="summary-value">23</span>
          </div>
        </div>

        {badgesEarned.length > 0 && (
          <div className="earned-badges">
            <h4>Badges Earned</h4>
            <div className="badges-list">
              {badgesEarned.map((badge) => (
                <span key={badge} className="earned-badge">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="completion-actions">
          <button className="btn-primary">Browse Tenders</button>
          <button className="btn-secondary">Complete Profile</button>
        </div>
      </div>
    );
  };

  // ============================================
  // MAIN COMPONENT
  // ============================================

  const SolarOnboarding = () => {
    const [currentStage, setCurrentStage] = useState(1);
    const [formData, setFormData] = useState({});
    const [isComplete, setIsComplete] = useState(false);

    const stages = [
      { id: 1, layer: 1, title: "Account", duration: "30s" },
      { id: 2, layer: 1, title: "Legal Identity", duration: "2m" },
      { id: 3, layer: 2, title: "Business Profile", duration: "5-8m" },
      { id: 4, layer: 3, title: "Tender Preferences", duration: "3m" },
      { id: 5, layer: 4, title: "Financial Readiness", duration: "3m" },
      { id: 6, layer: 4, title: "Escrow Setup", duration: "2m" },
      { id: 7, layer: 4, title: "Verification", duration: "Optional" },
    ];

    const layers = [
      { id: 1, name: "Identity", desc: '"I exist"' },
      { id: 2, name: "Capability", desc: '"I can execute"' },
      { id: 3, name: "Eligibility", desc: '"I can bid here"' },
      { id: 4, name: "Transaction", desc: '"I can transact safely"' },
    ];

    const updateFormData = (updates) => {
      setFormData((prev) => ({ ...prev, ...updates }));
    };

    const completeStage = () => {
      if (currentStage < 7) {
        setCurrentStage((prev) => prev + 1);
      } else {
        setIsComplete(true);
      }
    };

    const goToStage = (stageId) => {
      if (stageId <= currentStage) {
        setCurrentStage(stageId);
      }
    };

    const currentLayer = stages.find((s) => s.id === currentStage)?.layer || 1;
    const progressPercent = isComplete ? 100 : ((currentStage - 1) / 7) * 100;

    const renderStage = () => {
      switch (currentStage) {
        case 1:
          return (
            <Stage1AccountCreation
              data={formData}
              onUpdate={updateFormData}
              onComplete={completeStage}
            />
          );
        case 2:
          return (
            <Stage2LegalSnapshot
              data={formData}
              onUpdate={updateFormData}
              onComplete={completeStage}
            />
          );
        case 3:
          return (
            <Stage3BusinessProfile
              data={formData}
              onUpdate={updateFormData}
              onComplete={completeStage}
            />
          );
        case 4:
          return (
            <Stage4TenderProfile
              data={formData}
              onUpdate={updateFormData}
              onComplete={completeStage}
            />
          );
        case 5:
          return (
            <Stage5FinancialReadiness
              data={formData}
              onUpdate={updateFormData}
              onComplete={completeStage}
            />
          );
        case 6:
          return (
            <Stage6EscrowSetup
              data={formData}
              onUpdate={updateFormData}
              onComplete={completeStage}
            />
          );
        case 7:
          return (
            <Stage7DocumentVerification
              data={formData}
              onUpdate={updateFormData}
              onComplete={completeStage}
            />
          );
        default:
          return null;
      }
    };

    if (isComplete) {
      return (
        <div className="onboarding-container">
          <CompletionScreen data={formData} />
        </div>
      );
    }

    return (
      <div className="onboarding-container">
        <header className="onboarding-header">
          <div className="logo">
            <span className="logo-icon">☀️</span>
            <span className="logo-text">SolarBid</span>
          </div>
          <div className="header-progress">
            <span className="progress-text">
              {Math.round(progressPercent)}% complete
            </span>
          </div>
        </header>

        <aside className="trust-sidebar">
          <div className="sidebar-title">Trust Layers</div>
          <div className="layers-track">
            {layers.map((layer) => (
              <div
                key={layer.id}
                className={`layer-item ${
                  currentLayer >= layer.id ? "active" : ""
                } ${currentLayer === layer.id ? "current" : ""}`}
              >
                <div className="layer-indicator">
                  <span className="layer-number">{layer.id}</span>
                </div>
                <div className="layer-info">
                  <span className="layer-name">{layer.name}</span>
                  <span className="layer-desc">{layer.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="stages-list">
            {stages.map((stage) => (
              <button
                key={stage.id}
                className={`stage-item ${
                  currentStage === stage.id ? "current" : ""
                } ${currentStage > stage.id ? "completed" : ""}`}
                onClick={() => goToStage(stage.id)}
                disabled={stage.id > currentStage}
              >
                <span className="stage-check">
                  {currentStage > stage.id ? "✓" : stage.id}
                </span>
                <span className="stage-title">{stage.title}</span>
                <span className="stage-duration">{stage.duration}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="onboarding-main">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          {renderStage()}
        </main>
      </div>
    );
  };
  return <SolarOnboarding />;
}
