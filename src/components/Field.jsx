/** Reusable field component */
export function Field({
    label,
    name,
    value,
    onChange,
    onBlur,
    error,
    help,
    unit,
    badge,
    type = "text",
    ...rest
}) {
    return (
        <div className={`form-group ${error ? "has-error" : ""}`}>
            <label htmlFor={name} className="label-row">
                <span>{label}</span>
                {badge ? <span className="hint-badge">{badge}</span> : null}
            </label>

            <div className="input-with-unit">
                <input
                    id={name}
                    name={name}
                    value={value}
                    type={type}
                    onChange={(e) => onChange(name, e.target.value)}
                    onBlur={() => onBlur(name)}
                    {...rest}
                />
                {unit ? <span className="unit">{unit}</span> : null}
            </div>

            {help ? <small>{help}</small> : null}
            {error ? <div className="error-msg">{error}</div> : null}
        </div>

    );
}